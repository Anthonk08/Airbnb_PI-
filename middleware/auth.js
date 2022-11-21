const mysqlService = require("../services/mysql");
const logService = require("../services/log");

/**
 *
 * Este middleware sirve para verificar:
 * - El estado de la sesion
 * - Ver si el usuario existe
 * - Ver si el usuario esta activo
 * - Obtener los permisos del usuario
 * - Obtener informacion de procesos del usuario
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateUser = async (req, res, next) => {
  // Si las rutas pasadas son las rutas de login entonces no se ejecuta el middleware

  const ruta = req.url;

  const rutasEvitar = ["/", "/login", "/logout"];

  if (rutasEvitar.includes(ruta)) return next();

  // Obtenemos los datos de sesion

  const { state, user_name } = req.session;

  // Verificamos que el estado de la sesion sea el correcto para la confirmacion del usuario

  if (
    state != "done" ||
    user_name == undefined ||
    user_name == "" ||
    user_name == null
  ) {
    req.pointpost.state = "invalid";
    res.redirect("/");
    return;
  }

  // Obtenemos los datos del usuario

  let userInfo = [];
  try {
  } catch (err) {
    req.pointpost.state = "invalid";
    logService.error(`Error al buscar usuario en la BD. Detalle: ${err}`);
    req.pointpost.sessionError =
      "Estamos experimentando problemas técnicos. Intente más tarde.";
    res.redirect("/");
    return;
  }

  // Verificamos que el usuario exista

  if (!userInfo) {
    req.pointpost.state = "nouser";
    logService.error(
      "No se pudo cargar información de usuario. Error: No hubo resultados en la búsqueda. Session: " +
        user_name
    );
    res.pointpost.sessionError =
      "No se pudo cargar información intente más tarde.";
    res.redirect("/");
    return;
  }

  // Verificamos que el usuario este activo

  if (userInfo.status == "0") {
    req.pointpost.state = "invalid";
    logService.error("Intento acceso de usuario desactivado.");
    req.pointpost.sessionError =
      "Su usuario no se encuentra actualmente disponible. Contacte soporte técnico para saber el motivo.";
    res.redirect("/");
    return;
  }

  // Establecemos los datos de procesos del usuario

  req.pointpost.user_email = userInfo.user_email;
  req.pointpost.pending_work = userInfo.pending_work;
  req.pointpost.work_id = userInfo.work_id;
  req.pointpost.selected_id_company = userInfo.selected_id_company;
  req.pointpost.selected_id_prestation = userInfo.selected_id_prestation;
  req.pointpost.id_receipt_type = 0;
  req.pointpost.last_activity = userInfo.last_activity;

  // Obtenemos los permisos del usuario

  let userPermisos = [];
  try {
    userPermisos = await mysqlService.cargarPermisosUsuario(user_name);
  } catch (err) {
    req.pointpost.state = "invalid";
    logService.error(
      `Error al buscar los permisos del usuario en la BD. Detalle: ${err}`
    );
    req.pointpost.sessionError =
      "Estamos experimentando problemas técnicos. Intente más tarde.";
    res.redirect("/");
    return;
  }

  if (
    userPermisos.length <= 0 ||
    userPermisos == null ||
    userPermisos == null
  ) {
    req.pointpost.state = "invalid";
    logService.error(
      `Error, Este usuario no tiene ningun permiso agregado: ${err}`
    );
    req.pointpost.sessionError =
      "Usted no tiene autorizacion a este sistema, comuniquese con soporte tecnico";
    res.redirect("/");
    return;
  }

  // Obtenemos todos los permisos del sistema

  let listaTotalPermisos = [];
  try {
    listaTotalPermisos = await mysqlService.cargarListaPermisos(user_name);
  } catch (err) {
    req.pointpost.state = "invalid";
    logService.error(
      `Error al buscar los permisos del usuario en la BD. Detalle: ${err}`
    );
    req.pointpost.sessionError =
      "Estamos experimentando problemas técnicos. Intente más tarde.";
    res.redirect("/");
    return;
  }

  if (
    listaTotalPermisos.length <= 0 ||
    userPermisos == null ||
    userPermisos == null
  ) {
    req.pointpost.state = "invalid";
    logService.error(
      `Error, No existen permisos agregados en la base de datos: ${err}`
    );
    req.pointpost.sessionError =
      "Estamos experimentando problemas técnicos. Intente más tarde.";
    res.redirect("/");
    return;
  }

  // Lista de permisos

  let permisos = {};

  for (let i = 0; i < listaTotalPermisos.length; i++) {
    permisos[listaTotalPermisos[i].nombre_permiso] = false;
    for (let k = 0; k < userPermisos.length; k++) {
      if (listaTotalPermisos[i].id_permiso == userPermisos[k].id_permiso) {
        permisos[listaTotalPermisos[i].nombre_permiso] = true;
      }
    }
  }

  // Agregamos una lista de permisos a la sesion del usuario

  req.pointpost.permisos = permisos;

  next();
};

module.exports = {
  validateUser,
};
