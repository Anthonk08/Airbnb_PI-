const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");

//POST---------------------------------
const registerUser = async (req, res) => {
  const { email, name, lastname, pass } = req.body;
  // VALIDACIONES DE CAMPOS
  if (email == undefined || email == "") {
    req.session.sessionError = "Debe digitar un correo";
    res.redirect("/register");
    return;
  }

  if (name == undefined || name == "") {
    req.session.sessionError = "Debe digitar su nombre";
    res.redirect("/register");
    return;
  }

  if (lastname == undefined || lastname == "") {
    req.session.sessionError = "Debe digitar su apellido";
    res.redirect("/register");
    return;
  }

  if (pass == undefined || pass == "") {
    req.session.sessionError = "Debe digitar una contrasña";
    res.redirect("/register");
    return;
  } else if (pass.length < 8) {
    req.session.sessionError = "La contraseña debe tener mas de 8 caracteres";
    res.redirect("/register");
    return;
  }

  // SE PROCEDE A REGISTRAR AL USUARIO
  try {
    console.log("VERIFICANDO SI EL USUARIO EXISTE");
    var userExist = await mysqlService.verifyUser(email);
    console.log(userExist);
    if (userExist != undefined) {
      req.session.sessionError = "Ya hay un usuario registrado con este correo";
      console.error("ERROR: ", req.session.sessionError);

      res.redirect("/register");
      return;
    }
  } catch (error) {
    req.session.sessionError = "Error al validar el usuario";
    console.error("ERROR: ", error);

    res.redirect("/register");
    return;
  }

  try {
    console.log("PROCEDIENDO A REGISTRAR USUARIO");

    await mysqlService.createUser(email, name, lastname, 25, pass);

    // Si el registro fue exitoso, redirect a la pantalla de registro y mostrar al usuario que se ha registrado

    req.session.sessionSuccess = "Se ha registrado correctamente";
    res.redirect("/login");
    return;
  } catch (error) {
    req.session.sessionError =
      "Error al procesar el registro, intentelo mas tarde.";

    console.error("ERROR: ", error);

    res.redirect("/register");
    return;
  }
};

const registerPropertyPost = async (req, res) => {
  // Si el usuario no tiene una session activa, sera devuelto a la pantalla principal
  if (req.session.user_id == undefined) {
    req.session.sessionError = "No tiene acceso a esta pantalla";
    res.redirect("/home");
    return;
  }

  const {
    tipo_vivienda,
    loc,
    address,
    city,
    persons,
    beds,
    rooms,
    baths,
    source,
    precio,
  } = req.body;

  if (address == undefined || address == "") {
    req.session.sessionError = "Debe digitar una direccion";
    res.redirect("/register-property");
    return;
  }

  if (city == undefined || city == "") {
    req.session.sessionError = "Debe seleccionar una ciudad";
    res.redirect("/register-property");
    return;
  }

  if (precio == undefined || isNaN(precio)) {
    req.session.sessionError = "Debe digitar el precio por alquiler";
    res.redirect("/register-property");
    return;
  }

  if (beds == undefined || isNaN(beds)) {
    req.session.sessionError = "Debe digitar la cantidad de habitaciones";
    res.redirect("/register-property");
    return;
  }

  if (rooms == undefined || isNaN(rooms)) {
    req.session.sessionError = "Debe digitar la cantidad de habitaciones";
    res.redirect("/register-property");
    return;
  }

  if (persons == undefined || isNaN(persons)) {
    req.session.sessionError = "Debe digitar la cantidad de personas";
    res.redirect("/register-property");
    return;
  }

  if (baths == undefined || isNaN(baths)) {
    req.session.sessionError = "Debe digitar la cantidad de baños";
    res.redirect("/register-property");
    return;
  }
  var propertyId;
  // guardar registro.
  try {
    var saveProperty = await mysqlService.registerUserProperty(
      req.session.user_id,
      tipo_vivienda,
      loc,
      address,
      city,
      persons,
      beds,
      rooms,
      baths,
      precio
    );

    logService.info(`Propiedad registrada, id: ${saveProperty}`);
    propertyId = saveProperty;
  } catch (error) {
    req.session.sessionError =
      "Error al procesar el registro, intentelo mas tarde.";
    console.error("ERROR: ", error);
    res.redirect("/register-property");
    return;
  }

  // guardar la imagen
  try {
    await mysqlService.savePropertyImage(1, propertyId, source);
  } catch (error) {
    req.session.sessionError =
      "Error al procesar el registro, intentelo mas tarde.";
    console.error("ERROR: ", error);
    res.redirect("/register-property");
    return;
  }

  req.session.sessionSuccess = "Se ha registrado su propiedad";
  res.redirect("/register-property");
};

//GET-----------------------------------
const getRegisterEmail = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);
  if (req.session.sessionError != undefined) {
    console.log(req.session.sessionError);
  }

  // Al acceder a la ruta raiz:

  if (req.session.user_id != undefined) {
    res.redirect("/home");
    return;
  }
  var error, success;
  success = req.session.sessionSucces;
  error = req.session.sessionError;

  req.session.sessionSuccess = undefined;
  req.session.sessionError = undefined;
  res.render("register", {
    error,
    success,
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });

  // si se ha registrado correctamente se le avisa al usuario
  // if (req.session.sessionSuccess) {
  //   res.render("register", {
  //     sessionSuccess: req.session.sessionSucces,
  //     sessionError: "",
  //     message: req.session.message,
  //     user_name:
  //       req.session.user_name == undefined ? "" : req.session.user_name,
  //   });
  // } else if (req.session.sessionError) {
  //   res.render("register", {
  //     sessionSuccess: "",
  //     sessionError: req.session.sessionError,
  //     message: req.session.message,
  //     user_name:
  //       req.session.user_name == undefined ? "" : req.session.user_name,
  //   });
  //   // carga normal de la pantalla
  // } else {
  //   res.render("register", {
  //     sessionSuccess: false,
  //     sessionError: false,
  //     message: "",
  //     user_name:
  //       req.session.user_name == undefined ? "" : req.session.user_name,
  //   });
  // }
  // se limpian las variables para no mostrarlo en otras pantallas
};

const getRegisterPhone = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/");
    return;
  }

  res.render("register-phone");
};

const getRegisterProperty = async (req, res) => {
  console.log(req.session);
  var message = undefined;

  if (req.session.sessionError != undefined && req.session.sessionError != "") {
    // console.log(req.session.sessionError);
  }

  if (req.session.user_id == undefined) {
    res.redirect("/home");
    return;
  }

  if (
    req.session.sessionSuccess != undefined &&
    req.session.sessionSuccess != ""
  ) {
    // console.log("esta accediendo:", req.session.sessionSuccess);
    message = req.session.sessionSuccess;
    req.session.sessionSuccess = "";
  }

  var cities,
    livingTypes = "";
  try {
    cities = await mysqlService.getCity();
    livingTypes = await mysqlService.getLivingType();
  } catch (error) {}

  // carga de la pantalla
  res.render("register-property", {
    cities: cities,
    livingTypes: livingTypes,
    message: message,
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

module.exports = {
  registerUser,
  getRegisterEmail,
  getRegisterPhone,
  getRegisterProperty,
  registerPropertyPost,
};
