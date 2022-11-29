// Importacion de modulos
const express = require("express");
const mysql = require("mysql");
const https = require("https");
const cookieParser = require("cookie-parser");
const session = require("client-sessions");
const paypal = require("paypal-rest-sdk");
const logService = require("./services/log");

// Importacion de modulos propios
const config = require("./config");

// Traemos todas las rutas
const indexRouter = require("./routes/index");

// Configurar accesos a las bases de datos.
const connect = mysql.createConnection(config.dbConecction);

// Instancia objeto server

const app = express();

// El view engine que se utilizara para renderizar la pagina web

app.set("view engine", "ejs");

// Configuración de carpeta estática.

app.use(express.static(__dirname + "/public"));

// Configuración de body-parser

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use(
  session({
    cookieName: "session",
    secret: "&2QuMc",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    resave: true,
  })
);

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AeVqqLFLg-1apjFQeNe7dqhgQzCk2gK-vaLGGpgxnXQIpjsd99D-LSzYP3LSSIcM84nx4Lb6mQH9TMlF",
  client_secret:
    "ECPWOoZXyfhxUtVJnQPTQMEvYe-kGC4mDnyRjcsJs3_-Nwm8FD8qV83Bbu2JQNcW4vQaHYBnBJE33hLe",
});

// Configuracion de rutas.

app.use("/", indexRouter);

connect.connect((error) =>
  error
    ? logService.error("❌ Error conexion airbnb. ERROR: " + error.message)
    : logService.info("✔ Conectado con airbnb")
);

// Manejadores de URls no disponibles.

app.get("*", async function (req, res) {
  res.redirect("/home");
});

app.post("*", function (req, res) {
  res.redirect("/home");
});

// Inicio del servicio en desarrollo.

app.listen(3000, async () => {
  logService.info("Servidor iniciado en el puerto :3000");
});
