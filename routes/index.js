const router = require("express").Router();

// Controladores
const ctrlHome = require("../controller/home");
const ctrlLogin = require("../controller/login");
// rutas de los controladores
router.get('/', ctrlLogin.loadIndex); // ruta raiz de todo el proyecto
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

router.get('/home', ctrlHome.home);

module.exports = router;