const router = require("express").Router();
// Controladores
const ctrlHome = require("../controller/home");
const ctrlLogin = require("../controller/login");
const ctrlRegister = require("../controller/register");
const ctrlProfile = require("../controller/profile");

// rutas de los controladores
router.get('/home', ctrlHome.loadIndex); // ruta raiz de todo el proyecto
router.post('/logout', ctrlHome.setVariables);

//ENDPOINT DEL LOGIN
router.post('/login', ctrlLogin.logIn);
router.get('/login', ctrlLogin.getLoginView);

//ENDPOINT DE REGISTROS
router.post('/register', ctrlRegister.registerUser);
router.get('/register', ctrlRegister.getRegisterEmail);
router.get('/register-phone', ctrlRegister.getRegisterPhone);
router.get('/register-property', ctrlRegister.getRegisterProperty);
router.post('/register-property',ctrlRegister.registerPropertyPost);

//ENDPOINT DEL PERFIL DE USUARIO
// TODO: definir ruta de la pantalla de perfil de usuario
router.get('/', ctrlProfile.loadRentalHistory);
router.get('/', ctrlProfile.loadPropertyHistory);
router.get('/', ctrlProfile.loadPaymentHistory);

module.exports = router;