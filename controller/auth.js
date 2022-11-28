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

const getMessagesGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("messages-guest", {});
};

const getFavoritesGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("favorites-guest", {});
};

const getNotificationGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("notification-guest", {});
};

const getAccount = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/account", {});
};

const getProfileAccount = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/profile-account", {});
};

const getPersonalInformation = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/personal-information", {});
};

const getLoginSecurity = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/login-security", {});
};

const getPaymentsCollections = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/payments-collections", {});
};

const getNotifications = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/notifications", {});
};

const getHelp = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("help", {});
};

const getHostPage = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page", {});
};

const getMessagesHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("messages-host", {});
};

const getNotificationHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("notification-host", {});
};

const getResumeHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("resume-host", {});
};

const getLodgingHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("lodging", {});
};

const getDashboardAbandonedReservations = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-abandoned-reservations", {});
};

const getDashboardBookings = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-bookings", {});
};

const getDashboardDesactivatedAccounts = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-desactivated-accounts", {});
};

const getDashboardHome = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-home", {});
};

const getDashboardProfit = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-profit", {});
};

const getDashboardUsers = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-users", {});
};

const getBookings = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("bookings", {});
};
const getContact = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("contact", {});
};
const getSuggestions = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("suggestions", {});
};
const getAboutUs = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("about-us", {});
};

const getBecomeHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("become-host", {});
};

const getReceivesGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("receives-guest", {});
};

const getSearchBookings = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("search-bookings", {});
};

const getLodgingprofile = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("lodging-profile", {});
};

const getLodgingBooking = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("lodging-booking", {});
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
  getMessagesGuest,
  getFavoritesGuest,
  getNotificationGuest,
  getAccount,
  getHelp,
  getHostPage,
  getMessagesHost,
  getNotificationHost,
  getResumeHost,
  getLodgingHost,
  getDashboardAbandonedReservations,
  getDashboardBookings,
  getDashboardDesactivatedAccounts,
  getDashboardHome,
  getDashboardProfit,
  getDashboardUsers,
  getBookings,
  getContact,
  getSuggestions,
  getAboutUs,
  getBecomeHost,
  getReceivesGuest,
  getSearchBookings,
  getLodgingprofile,
  getLodgingBooking,
  getProfileAccount,
  getPersonalInformation,
  getLoginSecurity,
  getPaymentsCollections,
  getNotifications,
};
