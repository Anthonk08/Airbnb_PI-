const crypto = require("crypto");

const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");


const logOut = (req, val) => {

    // Datos de acceso

    req.state = val;
    req.user_id = val;
    req.user_name = val;
    req.permisos = val;

    // Datos de estado de procesos

    req.sessionError = val;
    req.sessionSuccess = val;

};

const loadIndex = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    // Si el estado es [done] el usuario ya inicio sesion correctamente por lo que se envia al dashboard

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    // Si el estado es [password] el usuario ha ingresado una contrasena incorrecta

    // Si el estado es [nouser] el usuario no ha sido encontrado en la base de datos

    // Si el estado esta [invalid]  ha ocurrido un error fatal

    // Si el estado esta [undefined] se inicializan las variables de sesion y se renderiza el index

    if (req.state == "password" || req.state == "nouser" || req.state == "invalid" || req.state == undefined || req.state == "") {

        let sessionError = "";

        if (req.sessionError !== "" && req.sessionError !== undefined) {
            sessionError = req.sessionError;
        }

        let mensajeError = "";
        switch (req.state) {

            case "password":
                logService.info("Estado del usuario: password");
                mensajeError = "showMessage('Error','La constraseña no coincide con el usuario.','#ff4f4f');";
                break;

            case "nouser":
                logService.info("Estado del usuario: nouser");
                mensajeError = "showMessage('Error','El usuario no existe.','#ff4f4f');";
                break;

            case "invalid":
                logService.info("Estado del usuario: invalid");
                mensajeError = "showMessage('Error','Debe iniciar sesión.','#ff4f4f');";
                break;

            case undefined:
                logService.info("Inicializacion de variables de sesion.");
                mensajeError = "";
                break;

            default:
                logService.info("ESTADO NULL");
                mensajeError = "";
                break;
        }

        logOut(req, undefined);
        mysqlService.getUserInfo('joshue_10@hotmail.es');
        res.render("login", {
            login_val: mensajeError,
            sessionError,
        });

    }

}

const getRegisterEmail = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("register", {
        
    });
}

const getRegisterPhone = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("register-phone", {
        
    });
}

const getRegisterProperty = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("register-property", {
        
    });
}

// POST
const logIn = async (req, res) => {

    // Validamos los parametros recibidos
    const { user_name, user_password } = req.body;

    if (user_name === "" || user_name === undefined) {
        logService.error(`El parametro [user_name] no esta definido`);
        // req.sessionError = "El USUARIO escrito no es valido, Intente de nuevo.";
        res.redirect("/");
        return;
    }

    if (user_password === "" || user_password === undefined) {
        logService.error(`El parametro [user_password] no esta definido`);
        // req.sessionError = "El PASSWORD escrito no es valido, Intente de nuevo.";
        res.redirect("/");
        return;
    }

    logService.log(`Usuario: ${user_name}`);

    // Obtenemos los datos del usuario

    let userInfo = null;
    try {
        userInfo = (await mysqlService.cargarUsuario(user_name))[0];
    } catch (err) {
        logService.error(`Error al buscar usuario en la BD. Detalle: ${err}`);
        res.redirect("/");
        return;
    }

    // Verificamos que el usuario exista.

    if (!userInfo) {
        logService.error(`El usuario no existe. | data: {user_name: ${user_name} }`);
        res.redirect("/");
        return;
    }

    // Verificamos si el password es el correcto


    if (userInfo.user_password !== user_password) {

        logService.warn(`El usuario existe pero la contraseña no coincide. | data: {user_name: ${user_name.toLowerCase()} }`);
        res.redirect("/");
        return;
    }

    // Verificamos que el usuario este activo

    if (userInfo.status == "0") {
        req.state = "invalid";
        req.sessionError = "Su usuario no se encuentra actualmente disponible. Contacte soporte técnico para saber el motivo.";
        logService.warn("Intento acceso de usuario desactivado.");
        res.redirect("/");
        return;
    }

    logService.info(`Sesion iniciada. | session: ${user_name}`);

    res.redirect("/dashboard");
}

module.exports = {
    loadIndex,
    logIn,
    logOut,
    getRegisterEmail,
    getRegisterPhone,
    getRegisterProperty
}