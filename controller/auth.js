const crypto = require("crypto");

const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");
const homeCtrl = require("./home");

const getLoginView = (req, res) => {
  if (req.session.user_id != undefined) {
    res.redirect("/home");
    return;
  }

  res.render("login");
};

/**
 * POST para iniciar sesion
 * al iniciar sesion, mantendra el usuario en los request para que las demas pantallas validen que haya una sesion activa.
 * @param {string} email //req.body.email
 * @param {string} password //req.body.password
 * @returns
 */
const logIn = async (req, res) => {
  // Validamos los parametros recibidos
  const { email, password } = req.body;
  if (email == "" || email == undefined) {
    logService.error(`El parametro [email] no esta definido`);
    // req.sessionError = "El USUARIO escrito no es valido, Intente de nuevo.";
    res.redirect("/login");
    return;
  }

  if (password == "" || password == undefined) {
    logService.error(`El parametro [password] no esta definido`);
    // req.sessionError = "El PASSWORD escrito no es valido, Intente de nuevo.";
    res.redirect("/login");
    return;
  }

  logService.log(`Usuario: ${email}`);

  // Obtenemos los datos del usuario

  let userInfo = null;
  try {
    userInfo = await mysqlService.getUserInfo(email);
    console.log(userInfo);
  } catch (err) {
    logService.error(`Error al buscar usuario en la BD. Detalle: ${err}`);
    req.session.sessionError = `Error al buscar usuario en la BD. Detalle: ${err}`;

    res.redirect("/login");
    return;
  }

  // Verificamos si el password es el correcto
  if (userInfo == undefined) {
    req.session.sessionError =
      "Su usuario no se encuentra actualmente disponible. Contacte soporte técnico para saber el motivo.";

    res.redirect("/login");
    return;
  } else {
    if (userInfo.pass != password) {
      req.session.sessionError = `El usuario existe pero la contraseña no coincide. | data: {user_name: ${email.toLowerCase()} }`;

      logService.warn(
        `El usuario existe pero la contraseña no coincide. | data: {user_name: ${email.toLowerCase()}}`
      );
      logService.warn(req.session.sessionError);

      res.redirect("/login");
      return;
    }

    // Verificamos que el usuario este activo
    if (userInfo.active == "0") {
      req.session.state = "invalid";
      req.session.sessionError =
        "Su usuario no se encuentra actualmente disponible. Contacte soporte técnico para saber el motivo.";

      logService.warn(req.session.sessionError);
      logService.warn("Intento acceso de usuario desactivado.");

      res.redirect("/login");
      return;
    }

    // guardando datos del usuario en la sesion.
    req.session.user_id = userInfo.id;
    req.session.user_name = userInfo.name;

    req.session.state = "";

    logService.info(`Sesion iniciada. | session: ${email}`);

    res.redirect("/home");
  }
};

module.exports = {
  logIn,
  getLoginView,
};
