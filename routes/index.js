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
router.post('/logout', ctrlLogin.logOut);
router.get('/register', ctrlLogin.getRegisterEmail);
router.get('/register-phone', ctrlLogin.getRegisterPhone);
router.get('/register-property', ctrlLogin.getRegisterProperty);
router.get('/messages-guest', ctrlLogin.getMessagesGuest);
router.get('/favorites-guest', ctrlLogin.getFavoritesGuest);
router.get('/notification-guest', ctrlLogin.getNotificationGuest);
router.get('/account', ctrlLogin.getAccount);
router.get('/help', ctrlLogin.getHelp);

//ENDPOINT DEL PERFIL DE USUARIO
// TODO: definir ruta de la pantalla de perfil de usuario
router.get('/', ctrlProfile.loadRentalHistory);
router.get('/', ctrlProfile.loadPropertyHistory);
router.get('/', ctrlProfile.loadPaymentHistory);

module.exports = router;