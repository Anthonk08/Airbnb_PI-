const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");

const loadIndex = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    // Si el estado es [done] el usuario ya inicio sesion correctamente por lo que se envia al dashboard

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/");
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

        homeCtrl.setVariables(req, undefined);
        mysqlService.getUserInfo('joshue_10@hotmail.es');
        res.render("home", {
            login_val: mensajeError,
            sessionError,
        });

    }

}


const setVariables = (req, val) => {

    // Datos de acceso

    req.state = val;
    req.user_id = val;
    req.user_name = val;
    req.permisos = val;

    // Datos de estado de procesos

    req.sessionError = val;
    req.sessionSuccess = val;

};


module.exports = {
    loadIndex,
    setVariables
}