const crypto = require("crypto");

const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");
const homeCtrl = require("../controller/home");

const getLoginView = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/");
        return;
    }

    res.render("login", {
        
    });
}

const getMessagesGuest = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("messages-guest", {});
}

const getFavoritesGuest = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("favorites-guest", {});
}

const getNotificationGuest = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("notification-guest", {});
}

const getAccount = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("account", {});
}

const getHelp = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("help", {});
}

const getHostPage = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("host-page", {});
}

const getMessagesHost = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("messages-host", {});
}

const getNotificationHost = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("notification-host", {});
}

const getResumeHost = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("resume-host", {});
}

const getLodgingHost = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("lodging", {});
}

const getDashboardAbandonedReservations = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("dashboard-abandoned-reservations", {});
}

const getDashboardBookings = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("dashboard-bookings", {});
}

const getDashboardDesactivatedAccounts = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("dashboard-desactivated-accounts", {});
}

const getDashboardHome = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("dashboard-home", {});
}

const getDashboardProfit = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("dashboard-profit", {});
}

const getDashboardUsers = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("dashboard-users", {});
}

const getBookings = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("bookings", {});
}
const getContact = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("contact", {});
}
const getSuggestions = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("suggestions", {});
}
const getAboutUs = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("about-us", {});
}

const getBecomeHost = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("become-host", {});
}

const getReceivesGuest = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("receives-guest", {});
}

const getpolicies = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("policies", {});
}

// POST
const logIn = async (req, res) => {

    // Validamos los parametros recibidos
    const { email, password } = req.body;

    if (email === "" || email === undefined) {
        logService.error(`El parametro [email] no esta definido`);
        // req.sessionError = "El USUARIO escrito no es valido, Intente de nuevo.";
        res.redirect("/");
        return;
    }

    if (password === "" || password === undefined) {
        logService.error(`El parametro [password] no esta definido`);
        // req.sessionError = "El PASSWORD escrito no es valido, Intente de nuevo.";
        res.redirect("/");
        return;
    }

    logService.log(`Usuario: ${email}`);

    // Obtenemos los datos del usuario

    let userInfo = null;
    try {
        userInfo = await mysqlService.getUserInfo(email);
        console.log(userInfo);
         // Verificamos que el usuario exista.
    
    if (!userInfo) {
        logService.error(`El usuario no existe. | data: {user_name: ${email} }`);
        res.redirect("/login",{
            sessionError: `El usuario no existe. | data: {user_name: ${email} }`
        });
        return;
    }
    } catch (err) {
        logService.error(`Error al buscar usuario en la BD. Detalle: ${err}`);
        res.redirect("/login",{
            sessionError:`Error al buscar usuario en la BD. Detalle: ${err}`
        });
        return;
    }

   

    // Verificamos si el password es el correcto


    if (userInfo.pass != password) {

        logService.warn(`El usuario existe pero la contraseña no coincide. | data: {user_name: ${email.toLowerCase()} }`);
        res.redirect("/login",{
            sessionError: req.sessionError
        });
        return;
    }

    // Verificamos que el usuario este activo

    if (userInfo.active == "0") {
        req.state = "invalid";
        req.sessionError = "Su usuario no se encuentra actualmente disponible. Contacte soporte técnico para saber el motivo.";
        logService.warn("Intento acceso de usuario desactivado.");
        res.redirect("/login",{
            sessionError: req.sessionError
        });
        return;
    }
    req.sessionSucces = true;
    req.user_id = userInfo.id;

    logService.info(`Sesion iniciada. | session: ${email}`);

    res.redirect("/login",{
        sessionSucces: req.sessionSucces
    });
}

module.exports = {
    logIn,
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
    getpolicies
}