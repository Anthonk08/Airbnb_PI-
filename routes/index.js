const router = require("express").Router();
// Controladores
const ctrlHome = require("../controller/home");
const ctrlLogin = require("../controller/login");
const ctrlRegister = require("../controller/register");

// rutas de los controladores
router.get('/home', ctrlHome.loadIndex); // ruta raiz de todo el proyecto
router.post('/logout', ctrlHome.setVariables);

//CONTROLES DEL LOGIN
router.post('/login', ctrlLogin.logIn);
router.get('/login', ctrlLogin.getLogIn);

//CONTROLES DE REGISTROS
router.post('/register', ctrlRegister.registerPost);
router.get('/register', ctrlRegister.getRegisterEmail);
router.get('/register-phone', ctrlRegister.getRegisterPhone);
router.get('/register-property', ctrlRegister.getRegisterProperty);

module.exports = router;