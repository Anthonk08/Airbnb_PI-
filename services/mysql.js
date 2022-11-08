const mysql = require("mysql");
const config = require("../config");


const connection = mysql.createConnection(config.dbConecction);


const localQuery = (query) => new Promise((resolve, reject) => {
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
    const query = `select * from user where email = ${connection.escape(userName.toUpperCase())} limit 1;`;
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
 const createUser = (email,name,lastName,pass) =>
   new Promise((resolve, reject) => {
    const query = `insert into user (email,name,lastname,pass) values (${email},${name},${lastName},${pass})`;
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

 const registerUserProperty = (id_user,address,address2,id_city,price,itbis,rooms,adults,kids,geo) =>
  new Promise((resolve, reject) => {
  
    if(address2==undefined) address2='';

    // si el itbis no es seleccionado, su valor sera false
    if(itbis==undefined) itbis=0;

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
    const query = `select p.*, r.id_property, r.rental_date ,r.return_date  from payment p INNER JOIN rental r on p.id_rental =r.id where p.id_user =${idUser};`;
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



module.exports = {
  connection,
  getUserInfo,
  createUser,
  registerUserProperty,
  getRentalHistory,
  getPropertyHistory,
  getPropertyInfo,
  getPaymentHistory,
  getAllProperties,
  getCity
};
