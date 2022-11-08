const logService = require("../services/log");
const mysqlService = require("../services/mysql");
// const config = require("../config");

const loadIndex = async(req, res) => {

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

        try {
            homeCtrl.setVariables(req, undefined);
            var user = await mysqlService.getUserInfo('joshue_10@hotmail.es');
            var allProperty = await mysqlService.getAllProperties();

            res.render("home", {
                user,
                allProperty
            });
        } catch (error) {
            res.render("home", {
                login_val: mensajeError,
                sessionError,
            });
        }
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