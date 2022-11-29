const logService = require("../services/log");
const mysqlService = require("../services/mysql");
// const config = require("../config");

const loadIndex = async (req, res) => {
  const { user_name } = req.session;
  // console.log("USERID: ", req.session.user_id);

  try {
    var allProperty = await mysqlService.getAllProperties();

    if (req.session.state == undefined) {
      setVariables(req, "");
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

const getSearchBookings = async (req, res) => {
  const { city, persons, rooms, beds, baths } = req.query;
  var queryIsValid = false,
    lodgings,
    cities;

  if (city != undefined && isNaN(city)) {
    logService.error(
      `Error al buscar hospedajes: causante: param: city, value:${city}`
    );
    req.session.sessionError = "Error al buscar hospedajes";
    res.redirect("/search-lodgings");
    return;
  }

  if (persons != undefined && isNaN(persons)) {
    logService.error(
      `Error al buscar hospedajes: causante: param: persons, value:${persons}`
    );
    req.session.sessionError = "Error al buscar hospedajes";
    res.redirect("/search-lodgings");
    return;
  }

  if (rooms != undefined && isNaN(rooms)) {
    logService.error(
      `Error al buscar hospedajes: causante: param: rooms, value:${rooms}`
    );
    req.session.sessionError = "Error al buscar hospedajes";
    res.redirect("/search-lodgings");
    return;
  }

  if (beds != undefined && isNaN(beds)) {
    logService.error(
      `Error al buscar hospedajes: causante: param: beds, value:${beds}`
    );
    req.session.sessionError = "Error al buscar hospedajes";
    res.redirect("/search-lodgings");
    return;
  }

  if (baths != undefined && isNaN(baths)) {
    logService.error(
      `Error al buscar hospedajes: causante: param: baths, value:${baths}`
    );
    req.session.sessionError = "Error al buscar hospedajes";
    res.redirect("/search-lodgings");
    return;
  }

  if (
    city != "0" &&
    persons != "0" &&
    rooms != "0" &&
    beds != "0" &&
    baths != "0" &&
    city != undefined &&
    persons != undefined &&
    rooms != undefined &&
    beds != undefined &&
    baths != undefined
  )
    queryIsValid = true;

  try {
    console.log(queryIsValid);
    cities = await mysqlService.getCity();
    lodgings = await mysqlService.getAllProperties(
      city,
      persons,
      rooms,
      beds,
      baths,
      queryIsValid
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
    return;
  }

  res.render("search-bookings", {
    lodgings,
    cities,
  });
};

const getLodgingProfile = async (req, res) => {
  const { id } = req.query;
  // Al acceder a la ruta raiz:

  // Sino es un numero y tampoco esta definido, se envia al usuario a otra pagina
  if ((id != undefined && isNaN(id)) || id == undefined) {
    logService.error("ERROR PARAM, DATO:", id);
    req.session.sessionError =
      "Hubo un problema al consultar el perfil del alojamiento.";
    res.redirect("/search-bookings");
    return;
  }

  var propertyInfo;
  try {
    propertyInfo = await mysqlService.getPropertyInfo(id);
  } catch (error) {
    console.log(error);
    req.session.sessionError =
      "Ha ocurrido un error al traer la informacion de la propiedad";
    res.redirect("/search-bookings");
    return;
  }
  console.log(propertyInfo);
  if (propertyInfo == "No existe") {
    res.redirect("/search-bookings");
    return;
  }

  res.render("lodging-profile", {
    property: propertyInfo,
  });
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

module.exports = {
  loadIndex,
  setVariables,
  getSearchBookings,
  getLodgingProfile,
  getLodgingBooking,
};
