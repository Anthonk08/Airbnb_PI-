const router = require("express").Router();

// Controladores
const ctrlLogin = require("../controller/login");
const ctrlHome = require("../controller/home");
// rutas de los controladores
router.get('/', ctrlLogin.loadIndex); // ruta raiz de todo el proyecto
router.post('/login', ctrlLogin.logIn);
router.post('/logout', ctrlLogin.logOut);
router.get('/register', ctrlLogin.getRegisterEmail);
router.get('/register-phone', ctrlLogin.getRegisterPhone);

router.get('/home', ctrlHome.home);

module.exports = router;