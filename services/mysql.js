const mysql = require("mysql");
const config = require("../config");

const connection = mysql.createConnection(config.dbConecction);

const localQuery = (query) =>
  new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows.length == 0) {
        reject("Dato no encontrado.");
        return;
      }

      resolve(rows);
    });
  });

/**
 * Obtiene la información del usuario especificado.
 * @param {string} userName Nombre del usuario
 * @returns {Promise} Información de usuario
 */
const getUserInfo = (userName) =>
  new Promise((resolve, reject) => {
    const query = `select * from user where email = ${connection.escape(
      userName.toUpperCase()
    )} limit 1;`;
    connection.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Verifica si el usuario existe
 * @param {String} email
 * @returns
 */
const verifyUser = (email) =>
  new Promise((resolve, reject) => {
    const query = `select id from user where email='${email}';`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Registra el usuario como cliente
 * @param {string} email
 * @param {string} name
 * @param {string} lastName
 * @param {string} pass
 * @returns
 */
const createUser = (email, name, lastName, idCity, pass) =>
  new Promise((resolve, reject) => {
    const query = `insert into user (email,name,lastname,id_city,pass) values ('${email}','${name}','${lastName}',${idCity},'${pass}')`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Registro de propiedad
 * @param {*} id_user
 * @param {*} address
 * @param {*} address2
 * @param {*} id_city
 * @param {*} price
 * @param {*} itbis
 * @param {*} rooms
 * @param {*} adults
 * @param {*} kids
 * @param {*} geo
 * @returns
 */
const registerUserProperty = (
  id_user,
  address,
  address2,
  id_city,
  price,
  itbis,
  rooms,
  adults,
  kids,
  geo
) =>
  new Promise((resolve, reject) => {
    if (address2 == undefined) address2 = "";

    // si el itbis no es seleccionado, su valor sera false
    if (itbis == undefined) itbis = 0;

    const query = `insert into property (id_user,address,address2,id_city,price,itbis,rooms,adults,kids,geo) values 
    (${id_user},${address},${address2},${id_city},${price},${itbis},${rooms},${adults},${kids},${geo})`;

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve el listado de las ciudades, actualmente solo [Rep.Dom]
 * @returns
 */
const getCity = () =>
  new Promise((resolve, reject) => {
    const query = `select * from city;`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve el historial de las reservaciones de un usuario
 * @param {int} idUser
 * @returns
 */
const getRentalHistory = (idUser) =>
  new Promise((resolve, reject) => {
    const query = `select * from rental r inner join payment p on r.id = p.id_rental where r.id_user = ${idUser}`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve la informacion de las propiedades de un usuario.
 * @param {int} idUser
 * @returns
 */
const getPropertyInfo = (idUser) =>
  new Promise((resolve, reject) => {
    const query = `select * from property where id_user = ${idUser};`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve la informacion de todas las propiedads en orden descendiente.
 * @returns
 */
const getAllProperties = () =>
  new Promise((resolve, reject) => {
    const query = `select * from property where state = 1 order by id desc;`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve el listado de las ciudades, actualmente solo [Rep.Dom]
 * @returns
 */
const getPropertyHistory = (idProperty) =>
  new Promise((resolve, reject) => {
    const query = `select * from rental where id_property = ${idProperty};`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve el historial de pagos de un usuario
 * @returns
 */
const getPaymentHistory = (idUser) =>
  new Promise((resolve, reject) => {
    const query = `select p.*, r.id_property, r.rental_date ,r.return_date from payment p INNER JOIN rental r on p.id_rental =r.id where p.id_user =${idUser};`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows[0]);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

const makeReservation = (idUser, idProperty, startDate, endDate) =>
  new Promise(() => {
    var currentDate = moment().format("yyyy-mm-dd:hh:mm:ss");

    const query = `insert into rental(id_user,id_property,rental_date,return_date,last_update)
    values (${idUser},${idProperty},'${startDate}','${endDate}','${currentDate}')`;

    connection.query(query, (err, result, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });

const savePayment = (idUser, idRental, payer, amount, paymentDate) =>
  new Promise(() => {
    const query = `insert into payment(id_user,id_rental,id_payer,amount,payment_date)
    values (${idUser},${idRental},'${payer}','${amount}','${paymentDate}')`;

    connection.query(query, (err, result, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });

module.exports = {
  connection,
  getUserInfo,
  verifyUser,
  createUser,
  registerUserProperty,
  getRentalHistory,
  getPropertyHistory,
  getPropertyInfo,
  getPaymentHistory,
  getAllProperties,
  makeReservation,
  savePayment,
  getCity,
};
