const mysql = require("mysql");
const config = require("../config");


const connection = mysql.createConnection(config.dbConecction);

// /**
//  * 
//  * Obtenemos los permisos de un usuario
//  * 
//  * @param {*} user_name nombre del usuario
//  * @returns 
//  */
// const cargarPermisosUsuario = (user_name) => new Promise((resolve, reject) => {
//   const query = `SELECT
//     u.user_id,
//     u.user_name,
//     ga.nombre_grupo_acceso,
//     p.id_permiso,
//     p.nombre_permiso,
//     a.nombre_area
//   FROM 
//     user u
//   INNER JOIN 
//     user_vs_grupo_accesos uvga ON u.user_id = uvga.user_id
//   INNER JOIN 
//     grupo_accesos ga ON uvga.id_grupo_acceso = ga.id_grupo_acceso  
//   INNER JOIN
//     grupo_accesos_vs_permisos gavp ON ga.id_grupo_acceso = gavp.id_grupo_acceso
//   INNER JOIN
//     permisos p ON gavp.id_permiso = p.id_permiso 
//   INNER JOIN 
//     areas a ON p.id_permiso = a.id_area
//   WHERE
//     u.user_name  = ${connection.escape(user_name)};`;

//   connection.query(query, (err, rows, fields) => {
//     if (err) {
//       reject(err);
//       return;
//     }
//     if (rows.length > 0) {
//       resolve(rows);
//     } else {
//       reject("No hubo resultados.");
//     }
//   });
// });

// /**
//  * 
//  * Obtenemos todos los permisos
//  * 
//  * @param {*} user_name nombre del usuario
//  * @returns 
//  */
// const cargarListaPermisos = () => new Promise((resolve, reject) => {
//   const query = `SELECT * FROM permisos;`;

//   connection.query(query, (err, rows, fields) => {
//     if (err) {
//       reject(err);
//       return;
//     }
//     if (rows.length > 0) {
//       resolve(rows);
//     } else {
//       reject("No hubo resultados.");
//     }
//   });
// });



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
 * registra la relacion mucho vs mucho entre company y receipt_type
 * 
 * @param {*} idUser id de la empresa en la tabla company
 * @param {*} gruposAccesosCheck array de los id de los gurpos de acceso en la tabla grupo_accesos
 * @returns {Promise} retorna una promesa con un mensaje de estado
 */
// const updateUser_vs_grupo_accesos = async (idUser, gruposAccesosCheck) => {

//   // Antes de actualizar o insertar eliminamos los registros que tengan este idUser
//   // en la tabla user_vs_grupo_accesos.
//   try {
//     await deleteUser_vs_grupo_accesos(idUser);
//   } catch (err) {
//     throw new Error(err.message);
//   }

//   // Si gruposAccesosCheck no trae valores se omite el registro.
//   if (gruposAccesosCheck === undefined || gruposAccesosCheck === null || gruposAccesosCheck === '')
//     return;

//   // Se realiza el registro de las relaciones
//   for (let i = 0; i < gruposAccesosCheck.length; i++) {

//     let query = `CALL updateUser_vs_grupo_accesos(${idUser}, ${gruposAccesosCheck[i]})`;
//     try {
//       await localQuery(query);
//     } catch (err) {
//       throw new Error(err.message);
//     }

//   }

// }

/*ADMINISTRADOR*/

/**
 * Actualiza informacion de usuario.
 * @param {*} user_id
 * @param {*} user_name
 * @param {*} user_password
 * @param {*} user_email
 * @param {*} user_phone
 * @returns
 */
// function updateUser(
//   user_id,
//   user_name,
//   user_password,
//   user_email
// ) {
//   return new Promise(function (resolve, reject) {
//     var newPassword = "";

//     // if (user_password !== "" && user_password !== undefined) {
//     //   newPassword = crypto.createHash("sha256").update(user_password).digest("hex");
//     // }

//     let query = `call updateUser(${user_id},'${user_name}','${newPassword}','${user_email}','${user_phone}',${point_amount});`;

//     connection.query(query, function (error, rows) {
//       if (error) {
//         reject(error);
//         return;
//       }

//       let response = null;

//       try {
//         response = rows[0][0];
//       } catch (ex) {
//         reject(ex.message);
//         return;
//       }

//       resolve(response);
//     });
//   });
// }


module.exports = {
  connection,
  // cargarUsuario,
  getUserInfo,
  // updateUser_vs_grupo_accesos,
};
