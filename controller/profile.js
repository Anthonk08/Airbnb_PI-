const logService = require("../services/log");
const config = require("../config");
const mysqlService = require("../services/mysql");

const loadRentalHistory = async (req, res) => {
  const { id_user } = req.body;

  if (id_user != undefined || isNaN(id_user)) {
    req.session.sessionError =
      "El id de usuario no esta definido o no es un tipo integer";
    res.redirect("/home");
  }

  try {
    var rentals = await mysqlService.getRentalHistory(id_user);

    // TODO: decidir la ubicacion del render
    res.render("", {
      rentals: rentals,
      sessionSuccess: req.session.sessionSuccess,
    });
  } catch (error) {
    console.log(error);
  }
};

const loadPropertyHistory = async (req, res) => {
  const { id_property } = req.body;

  if (id_property != undefined || isNaN(id_property)) {
    req.session.sessionError =
      "El id de la propiedad no esta definido o no es un tipo integer";
    res.redirect("/home", {
      sessionError: req.session.sessionError,
    });
  }

  try {
    var rentals = await mysqlService.getPropertyHistory(id_property);

    // TODO: decidir la ubicacion del render
    res.render("", {
      rentals: rentals,
      sessionSuccess: req.session.sessionSuccess,
    });
  } catch (error) {
    console.log(error);
  }
};

const loadPaymentHistory = async (req, res) => {
  const { id_user } = req.body;

  if (id_user != undefined || isNaN(id_user)) {
    req.session.sessionError =
      "El id del usuario no esta definido o no es un tipo integer";
    res.redirect("/home", {
      sessionError: req.session.sessionError,
    });
  }

  try {
    var rentals = await mysqlService.getPaymentHistory(id_property);

    // TODO: decidir la ubicacion del render
    res.render("", {
      rentals: rentals,
      sessionSuccess: req.session.sessionSuccess,
    });
  } catch (error) {
    console.log(error);
  }
};

const loadUserInfo = async (req, res) => {
  const { id_user } = req.body;

  if (id_user != undefined || isNaN(id_user)) {
    req.session.sessionError =
      "El id del usuario no esta definido o no es un tipo integer";
    res.redirect("/home", {
      sessionError: req.session.sessionError,
    });
  }

  try {
    var rentals = await mysqlService.getUserInfo(id_user);

    // TODO: decidir la ubicacion del render
    res.render("", {
      rentals: rentals,
      sessionSuccess: req.session.sessionSuccess,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBookings = async (req, res) => {
  logService.info("Estado de la sesion: " + req.state);

  if (req.session.user_id == undefined) {
    res.redirect("/home");
    return;
  }

  var currentRent, payments;
  try {
    currentRent = await mysqlService.getCurrentRent(req.session.user_id);
  } catch (error) {
    console.log(error);
  }
  console.log(currentRent);

  res.render("bookings", { currentRent });
};

module.exports = {
  loadRentalHistory,
  loadPropertyHistory,
  loadPaymentHistory,
  loadUserInfo,
  getBookings,
};
