const logService = require("../services/log");
const mysqlService = require("../services/mysql");
// const config = require("../config");

const loadIndex = async (req, res) => {
  const { user_name } = req.session;
  console.log("USERID: ", req.session.user_id);

  try {
    var allProperty = await mysqlService.getAllProperties();

    if (req.session.state == undefined) {
      setVariables(req, undefined);
    }

    // si el usuario ha iniciado sesion pasara a la vista home adecuada al usuario
    if (user_name != undefined) {
      res.render("home", {
        allProperty,
        user_name,
      });
    } else {
      res.render("home", {
        allProperty,
        user_name: "",
      });
    }

    return;
  } catch (error) {
    console.error(error);
    res.render("home");
  }
};

const setVariables = (req, val) => {
  // Datos de acceso

  req.session.state = val;
  req.session.user_id = val;
  req.session.user_name = val;
  req.session.permisos = val;

  // Datos de estado de procesos

  req.session.sessionError = val;
  req.session.sessionSuccess = val;
};

module.exports = {
  loadIndex,
  setVariables,
};
