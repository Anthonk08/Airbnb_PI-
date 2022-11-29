const logService = require("../services/log");
const mysqlService = require("../services/mysql");

const getLoginView = (req, res) => {
  console.log(req.session.sessionError);
  if (req.session.user_id != "") {
    res.redirect("/home");
    return;
  }

  if (req.session.sessionError != "") {
    res.render("login", {
      sessionError: req.session.sessionError,
    });
    return;
  }
  var message = req.session.sessionSuccess;
  req.session.sessionSuccess = "";
  res.render("login", {
    sessionError: undefined,
    sessionSuccess: message,
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getMessagesGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("messages-guest", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getFavoritesGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("favorites-guest", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getNotificationGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("notification-guest", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getAccount = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/account", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getProfileAccount = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/profile-account", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getPersonalInformation = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/personal-information", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getLoginSecurity = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/login-security", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getPaymentsCollections = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/payments-collections", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getNotifications = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("account-pages/notifications", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getHelp = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("help", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getHostPage = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page/host-page", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getMessagesHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page/messages-host", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getNotificationHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page/notification-host", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getResumeHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page/resume-host", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getLodgingHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page/lodging", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getDashboardAbandonedReservations = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-pages/dashboard-abandoned-reservations", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getDashboardBookings = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-pages/dashboard-bookings", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getDashboardDesactivatedAccounts = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-pages/dashboard-desactivated-accounts", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getDashboardHome = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-pages/dashboard-home", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getDashboardProfit = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-pages/dashboard-profit", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getDashboardUsers = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("dashboard-pages/dashboard-users", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getContact = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("contact", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getSuggestions = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("suggestions", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getAboutUs = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("about-us", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getBecomeHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("host-page/become-host", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getReceivesGuest = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("receives-guest", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getcancellationpolicies = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }

  res.render("cancellation-policies", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getcriteriosconfianza = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }
  res.render("criterios-de-confianza", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getResponsibleHosting = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }
  res.render("alojamiento-responsable", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getWhyHost = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }
  res.render("por-que-anfitrion", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getServiceTerms = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }
  res.render("terminos", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
};

const getPrivacyPolicy = (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  // Al acceder a la ruta raiz:

  if (req.state == "done") {
    logService.info("Estado del usuario: done");
    res.redirect("/dashboard");
    return;
  }
  res.render("politicas-privacidad", {
    user_name: req.session.user_name == undefined ? "" : req.session.user_name,
  });
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
    req.session.sessionError =
      "El USUARIO escrito no es valido, Intente de nuevo.";
    res.redirect("/login");
    return;
  }

  if (password == "" || password == undefined) {
    logService.error(`El parametro [password] no esta definido`);
    req.session.sessionError =
      "El PASSWORD escrito no es valido, Intente de nuevo.";
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

      // logService.warn(req.session.sessionError);

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
    req.session.user_email = userInfo.email;
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
  getContact,
  getSuggestions,
  getAboutUs,
  getBecomeHost,
  getReceivesGuest,
  getResponsibleHosting,
  getWhyHost,
  getServiceTerms,
  getPrivacyPolicy,
  getcancellationpolicies,
  getcriteriosconfianza,
  getProfileAccount,
  getPersonalInformation,
  getLoginSecurity,
  getPaymentsCollections,
  getNotifications,
};
