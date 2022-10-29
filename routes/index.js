const router = require("express").Router();

// Controladores
const ctrlLogin = require("../controllers/login");
// rutas de los controladores
router.get('/', ctrlLogin.vistaLogin); // ruta raiz de todo el proyecto
router.post('/login', ctrlLogin.acceder);
router.post('/logout', ctrlLogin.salir);

module.exports = {
    
}