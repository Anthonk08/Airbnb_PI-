// Importacion de modulos
const express = require("express");
const mysql = require("mysql");
const https = require("https");

// Importacion de modulos propios
const config = require("./config");

// Traemos todas las rutas
const indexRouter = require("./routes/index");

// Configurar accesos a las bases de datos.
const connect = mysql.createConnection(config.dbConecction);

// Instancia objeto server

const app = express();

// El view engine que se utilizara para renderizar la pagina web

app.set("view engine", "html");

// Configuración de carpeta estática.

app.use(express.static("public"));

// Configuración de body-parser

app.use(express.json({ limit: "50mb", }));

app.use(express.urlencoded({ extended: true, limit: "50mb", }));

app.use(cookieParser());

app.use(
  session({
    cookieName: "airbnb",
    secret: "&2QuMc",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    resave: true,
  }));

  // Configuracion de rutas.

app.use("/", indexRouter);

connect.connect(error => error ? logService.error("❌ Error conexion airbnb. ERROR: " + error.message) : logService.info("✔ Conectado con airbnb"));

// Manejadores de URls no disponibles.

app.get("*", async function (req, res) {
    res.status(404).render("view_error_404");
});
  
app.post("*", function (req, res) {
    res.status(404).render("view_error_404");
});

// Inicio del servicio en desarrollo.

app.listen(3000, async () => {
    logService.info("Servidor iniciado en el puerto :3000");
  
  });