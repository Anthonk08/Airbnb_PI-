const router = require("express").Router();

// Controladores
const ctrlLogin = require("../controller/login");
// rutas de los controladores
router.get('/', ctrlLogin.loadIndex); // ruta raiz de todo el proyecto
router.post('/login', ctrlLogin.logIn);
router.post('/logout', ctrlLogin.logOut);

module.exports = router;