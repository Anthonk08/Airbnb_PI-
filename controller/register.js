const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");
const geolocation = require("geolocation");

//POST---------------
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
    req.session.message = "Se ha registrado correctamente";
    req.session.sessionSucces = true;
    res.redirect("/register");
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
  }

  const {
    address,
    address2,
    id_city,
    price,
    itbis,
    rooms,
    beds,
    persons,
    bathrooms,
  } = req.body;
  var currentPosition;

  if (address != undefined || address == "") {
    req.session.sessionError = "Debe digitar una direccion";
    res.redirect("/register-property");
  }

  if (id_city != undefined || id_city == "") {
    req.session.sessionError = "Debe seleccionar una ciudad";
    res.redirect("/register-property");
  }

  if (price != undefined || isNaN(price)) {
    req.session.sessionError = "Debe digitar el precio por alquiler";
    res.redirect("/register-property");
  }

  if (rooms != undefined || isNaN(rooms)) {
    req.session.sessionError = "Debe digitar la cantidad de habitaciones";
    res.redirect("/register-property");
  }

  if (adults != undefined || isNaN(adults)) {
    req.session.sessionError = "Debe digitar la cantidad de adultos maximo";
    res.redirect("/register-property");
  }

  if (kids != undefined || isNaN(kids)) {
    req.session.sessionError = "Debe digitar la cantidad de niños maximo";
    res.redirect("/register-property");
  }

  try {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err;

      currentPosition = position;
      console.log(position);
    });
  } catch (error) {
    req.session.sessionError = "Error al conseguir la ubicacion";
    console.error("ERROR: ", error);
    res.redirect("/register");
  }

  try {
    // await mysqlService.registerUserProperty(
    //   req.user_id,
    //   address,
    //   address2,
    //   id_city,
    //   price,
    //   itbis,
    //   rooms,
    //   adults,
    //   kids,
    //   currentPosition
    // );
  } catch (error) {
    req.sessionError = "Error al procesar el registro, intentelo mas tarde.";
    console.error("ERROR: ", error);
    res.redirect("/register");
  }

  req.sessionSucces = true;
  res.render("register-property");
};

//GET---------------
const getRegisterEmail = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);
  if (req.session.sessionError != undefined) {
    console.log(req.session.sessionError);
    req.session.sessionError = "";
  }

  // Al acceder a la ruta raiz:

  if (req.session.user_id != undefined) {
    res.redirect("/home");
    return;
  }

  // si se ha registrado correctamente se le avisa al usuario
  if (req.session.sessionSuccess) {
    res.render("register", {
      sessionSuccess: req.session.sessionSucces,
      sessionError: false,
      message: req.session.message,
    });
  } else if (req.session.sessionError) {
    res.render("register", {
      sessionSuccess: false,
      sessionError: req.session.sessionError,
      message: req.session.message,
    });
    // carga normal de la pantalla
  } else {
    res.render("register", {
      sessionSuccess: false,
      sessionError: false,
      message: "",
    });
  }
  // se limpian las variables para no mostrarlo en otras pantallas
  req.session.sessionSucces = false;
  req.session.sessionError = false;
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

const getRegisterProperty = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  // si el usuario no ha iniciado sesion, no tiene permitido ver esta pantalla
  if (req.session.user_id == undefined) {
    res.redirect("/home");
    return;
  }

  // carga de la pantalla
  res.render("register-property");
};

module.exports = {
  registerUser,
  getRegisterEmail,
  getRegisterPhone,
  getRegisterProperty,
  registerPropertyPost,
};
