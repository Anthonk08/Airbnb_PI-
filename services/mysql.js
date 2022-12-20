const mysql = require("mysql");
const config = require("../config");
const { decodeBase64Image } = require("../services/functions");
const fs = require("fs");
const moment = require("moment");
var path = require("path");

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
 *
 * @param {*} id_user
 * @param {*} tipo_vivienda
 * @param {*} loc
 * @param {*} address
 * @param {*} city
 * @param {*} persons
 * @param {*} beds
 * @param {*} rooms
 * @param {*} baths
 * @param {*} precio
 * @returns
 */
const registerUserProperty = (
  id_user,
  tipo_vivienda,
  loc,
  address,
  city,
  persons,
  beds,
  rooms,
  baths,
  precio
) =>
  new Promise((resolve, reject) => {
    const propertyQuery = `insert into property (id_user,address,id_city,price,rooms,beds,baths,adults,geo) values (${id_user},'${address}',${city},${precio},${rooms},${beds},${baths},${persons},'${loc}')`;

    connection.query(propertyQuery, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const categoryQuery = `insert into category_vs_property(id_category,id_property) values (${tipo_vivienda},${rows.insertId});`;
      connection.query(categoryQuery, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        // console.log(rows.insertId);
        resolve(rows.insertId);
      });
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
        resolve(rows);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve el listado de las ciudades, actualmente solo [Rep.Dom]
 * @returns
 */
const getLivingType = () =>
  new Promise((resolve, reject) => {
    const query = `select * from categories;`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows);
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
const getPropertyInfo = (idProperty) =>
  new Promise((resolve, reject) => {
    const query = `select p.*, u.name, u.lastname , pi2.source, c.provincia,c2.description as category
    from property p 
    inner join property_image pi2 on p.id = pi2.id
    inner join city c on p.id_city = c.id_provincia
    inner join category_vs_property cvp on p.id =cvp.id_property 
    inner join categories c2 on cvp.id_category =c2.id 
    inner join user u on p.id_user = u.id where p.id = ${idProperty}`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        if (!Object.keys(rows).length == 0) {
          resolve(rows[0]);
        } else {
          reject("No existe");
        }
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve la informacion de todas las propiedads en orden descendiente.
 * @returns
 */
const getAllProperties = (city, persons, rooms, beds, baths, queryIsValid) =>
  new Promise((resolve, reject) => {
    var query = `select p.*, pi2.source, c.provincia,c2.description as category
    from property p 
    inner join property_image pi2 on p.id = pi2.id
    inner join city c on p.id_city = c.id_provincia
    inner join category_vs_property cvp on p.id =cvp.id_property 
    inner join categories c2 on cvp.id_category =c2.id  
    order by p.id desc limit 10;`;

    if (queryIsValid) {
      query = `select p.*, pi2.source, c.provincia,c2.description as category
      from property p 
      inner join property_image pi2 on p.id = pi2.id
      inner join city c on p.id_city = c.id_provincia
      inner join category_vs_property cvp on p.id =cvp.id_property 
      inner join categories c2 on cvp.id_category =c2.id 
      where p.id_city =${city} and p.rooms >=${rooms} and p.beds >=${beds} and baths >=${baths} and p.adults >=${persons}  
      order by p.id desc limit 10;`;
    }

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        resolve(rows);
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
        resolve(rows);
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

const getCurrentRent = (idUser) =>
  new Promise((resolve, reject) => {
    const query = `select r.*,p.amount  from rental r 
    inner join payment p on p.id_rental =r.id where r.id_user =1 order by r.last_update desc;`;

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows.length == 0) resolve("");
      else resolve(rows);
    });
  });

const makeReservation = (idUser, idProperty, startDate, endDate) =>
  new Promise((resolve, reject) => {
    var currentDate = moment().format();

    const query = `insert into rental(id_user,id_property,rental_date,return_date,last_update)
    values ('${idUser}','${idProperty}','${startDate}','${endDate}','${currentDate}')`;

    connection.query(query, (err, result, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });

const savePayment = (idUser, idRental, payer, amount, paymentDate) =>
  new Promise((resolve, reject) => {
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

const savePropertyImage = (userId, idProperty, img_src) =>
  new Promise((resolve, reject) => {
    var imageTypeRegularExpression = /\/(.*?)$/;

    // Generate random string
    // var seed = crypto.randomBytes(20);
    // var uniqueSHA1String = crypto.createHash("sha1").update(seed).digest("hex");

    var imageBuffer = decodeBase64Image(img_src);
    var userPropertyDir =
      path.resolve(__dirname, "..") + `/public/property/${userId}/`;

    var imageName = "image-" + idProperty;

    // la extension esta en la variable [1]
    var imageExtension = imageBuffer.type.match(imageTypeRegularExpression)[1];

    var userImagePath = userPropertyDir + imageName + "." + imageExtension;

    // Save decoded binary image to disk
    try {
      fs.promises
        .mkdir(userPropertyDir, { recursive: true })
        .then(() => {
          fs.writeFile(userImagePath, imageBuffer.data, (err) => {
            if (err) {
              console.log(err);
              reject(error);
            } else {
              console.log("File written successfully\n");
              console.log("The written has the following contents:");
            }
          });
        })
        .catch(console.error);

      var imageURL = `/property/${userId}/${imageName}.${imageExtension}`;
      const query = `INSERT INTO property_image(id,source) values(${idProperty},'${imageURL}');`;
      connection.query(query, (err, result, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(userImagePath);
      });
    } catch (error) {
      console.log("ERROR:", error);
      reject(error);
      return;
    }
  });

/**
 * Devuelve el listado de las ciudades, actualmente solo [Rep.Dom]
 * @returns
 */
const getNewUsers = () =>
  new Promise((resolve, reject) => {
    const query = `select count(u.id) users from user u;`;
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
const getNewOwners = () =>
  new Promise((resolve, reject) => {
    const query = `select COUNT(u.id) as users from user u 
  inner join property p on p.id_user = u.id 
  GROUP by u.id HAVING COUNT(*) =1;`;
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
const getNewProperty = () =>
  new Promise((resolve, reject) => {
    const query = `select COUNT(p.id) properties from property p  `;
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
const getMoneyFromToday = () =>
  new Promise((resolve, reject) => {
    const query = `select IFNULL(SUM(p.amount),0) money from payment p where p.payment_date = DATE(NOW()) `;
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
const getMoneyFromWeek = () =>
  new Promise((resolve, reject) => {
    const query = `select IFNULL(SUM(p.amount),0) money from payment p where (p.payment_date  BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW())`;
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
const getMoneyFromMonth = () =>
  new Promise((resolve, reject) => {
    const query = `select IFNULL(SUM(p.amount),0) money from payment p where MONTH(p.payment_date) = MONTH(NOW())`;
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
const getTodaysRental = () =>
  new Promise((resolve, reject) => {
    const query = `select ifnull(COUNT(r.id),0) rental from rental r WHERE r.last_update = DATE(NOW()) `;
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
const getWeekRental = () =>
  new Promise((resolve, reject) => {
    const query = `select ifnull(COUNT(r.id),0) rental from rental r WHERE (r.last_update BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW()) `;
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
const getMonthRental = () =>
  new Promise((resolve, reject) => {
    const query = `select COUNT(r.id) rental from rental r WHERE MONTH(r.last_update) = MONTH(NOW())`;
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
const getAllRental = () =>
  new Promise((resolve, reject) => {
    const query = `select * from rental r inner join payment p on r.id = p.id_rental limit 10`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      try {
        resolve(rows);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

/**
 * Devuelve el listado de las ciudades, actualmente solo [Rep.Dom]
 * @returns
 */
const searchUsers = (name) =>
  new Promise((resolve, reject) => {
    const query = `SELECT id, email, pass, email_validation, pho_validation, id_country, id_city,name,lastname, active
    FROM user where CONCAT(name,' ',lastname) LIKE '%${name}%'`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      try {
        resolve(rows);
      } catch (ex) {
        reject(ex.message);
      }
    });
  });

const searchPayments = (name) =>
  new Promise((resolve, reject) => {
    const query = `SELECT p.* , CONCAT(u.name, ' ', u.lastname) nombre,p2.id property
    FROM user u 
    inner join payment p on p.id_user = u.id 
    inner join rental r on p.id_rental = r.id
    inner join property p2 on p2.id = r.id_property 
    where CONCAT(u.name, ' ', u.lastname, ' ', p.id_payer) LIKE '%${name}%'`;
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      try {
        resolve(rows);
      } catch (ex) {
        reject(ex.message);
      }
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
  localQuery,
  getLivingType,
  savePropertyImage,
  getCurrentRent,
  getNewUsers,
  getNewOwners,
  getNewProperty,
  getMoneyFromToday,
  getMoneyFromWeek,
  getMoneyFromMonth,
  getTodaysRental,
  getMonthRental,
  getWeekRental,
  getAllRental,
  searchUsers,
  searchPayments,
};
