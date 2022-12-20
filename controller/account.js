const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");
const homeCtrl = require("./home");

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

const searchUser = async (req, res) => {
  var result = await mysqlService.searchUsers(req.query.query);
  res.json(result);
};

const searchPayment = async (req, res) => {
  var result = await mysqlService.searchPayments(req.query.query);
  res.json(result);
};

module.exports = {
  getAccount,
  searchUser,
  searchPayment,
};
