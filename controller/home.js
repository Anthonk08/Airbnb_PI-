const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");


const home = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("home", {
        
    });
}
module.exports = {
    home
}