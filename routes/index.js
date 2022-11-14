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
router.post('/logout', ctrlHome.setVariables);
router.get('/register', ctrlRegister.getRegisterEmail);
router.get('/register-phone', ctrlRegister.getRegisterPhone);
router.get('/register-property', ctrlRegister.getRegisterProperty);
router.get('/messages-guest', ctrlLogin.getMessagesGuest);
router.get('/favorites-guest', ctrlLogin.getFavoritesGuest);
router.get('/notification-guest', ctrlLogin.getNotificationGuest);
router.get('/account', ctrlLogin.getAccount);
router.get('/help', ctrlLogin.getHelp);
router.get('/host-page', ctrlLogin.getHostPage);
router.get('/messages-host', ctrlLogin.getMessagesHost);
router.get('/notification-host', ctrlLogin.getNotificationHost);
router.get('/resume-host', ctrlLogin.getResumeHost);
router.get('/lodging', ctrlLogin.getLodgingHost);

//ENDPOINT DEL PERFIL DE USUARIO
// TODO: definir ruta de la pantalla de perfil de usuario
router.get('/profile-history', ctrlProfile.loadRentalHistory);
router.get('/profile-history', ctrlProfile.loadPropertyHistory);
router.get('/profile-history', ctrlProfile.loadPaymentHistory);

module.exports = router;