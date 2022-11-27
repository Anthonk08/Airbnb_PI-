const router = require("express").Router();
// Controladores
const ctrlHome = require("../controller/home");
const ctrlLogin = require("../controller/auth");
const ctrlRegister = require("../controller/register");
const ctrlProfile = require("../controller/profile");
const ctrlPayment = require("../controller/payment");

// rutas de los controladores
router.get("/home", ctrlHome.loadIndex); // ruta raiz de todo el proyecto
router.post("/logout", ctrlHome.setVariables);

//ENDPOINT DEL LOGIN
router.post("/login", ctrlLogin.logIn);
router.get("/login", ctrlLogin.getLoginView);
router.get("/messages-guest", ctrlLogin.getMessagesGuest);
router.get("/favorites-guest", ctrlLogin.getFavoritesGuest);
router.get("/notification-guest", ctrlLogin.getNotificationGuest);
router.get("/account", ctrlLogin.getAccount);
router.get("/help", ctrlLogin.getHelp);
router.get("/host-page", ctrlLogin.getHostPage);
router.get("/messages-host", ctrlLogin.getMessagesHost);
router.get("/notification-host", ctrlLogin.getNotificationHost);
router.get("/resume-host", ctrlLogin.getResumeHost);
router.get("/lodging", ctrlLogin.getLodgingHost);
router.get(
  "/dashboard-abandoned-reservations",
  ctrlLogin.getDashboardAbandonedReservations
);
router.get("/dashboard-bookings", ctrlLogin.getDashboardBookings);
router.get(
  "/dashboard-desactivated-accounts",
  ctrlLogin.getDashboardDesactivatedAccounts
);
router.get("/dashboard-home", ctrlLogin.getDashboardHome);
router.get("/dashboard-profit", ctrlLogin.getDashboardProfit);
router.get("/dashboard-users", ctrlLogin.getDashboardUsers);
router.get("/bookings", ctrlLogin.getBookings);
router.get("/contact", ctrlLogin.getContact);
router.get("/suggestions", ctrlLogin.getSuggestions);
router.get("/about-us", ctrlLogin.getAboutUs);
router.get("/become-host", ctrlLogin.getBecomeHost);
router.get("/receives-guest", ctrlLogin.getReceivesGuest);
router.get("/search-bookings", ctrlLogin.getSearchBookings);
router.get("/lodging-profile", ctrlLogin.getLodgingprofile);
router.get("/lodging-booking", ctrlLogin.getLodgingBooking);
router.get("/cancellation-policies", ctrlLogin.getcancellationpolicies);
router.get("/criterios-de-confianza", ctrlLogin.getcriteriosconfianza);

//ENDPOINT DEL PERFIL DE USUARIO
// TODO: definir ruta de la pantalla de perfil de usuario
router.get("/profile-history", ctrlProfile.loadRentalHistory);
router.get("/profile-history", ctrlProfile.loadPropertyHistory);
router.get("/profile-history", ctrlProfile.loadPaymentHistory);

//ENDPOINT DE REGISTROS
router.post("/register", ctrlRegister.registerUser);
router.get("/register", ctrlRegister.getRegisterEmail);
router.get("/register-phone", ctrlRegister.getRegisterPhone);
router.get("/register-property", ctrlRegister.getRegisterProperty);
router.post("/register-property", ctrlRegister.registerPropertyPost);

//ENDPOINT DEL PERFIL DE USUARIO
// TODO: definir ruta de la pantalla de perfil de usuario
router.get("/profile/history-rent", ctrlProfile.loadRentalHistory);
router.get("/profile/history-property", ctrlProfile.loadPropertyHistory);
router.get("/profile/history-payment", ctrlProfile.loadPaymentHistory);

router.post("/pay", ctrlPayment.payViaPaypal);
router.get("/pay-success", ctrlPayment.paySuccess);
router.get("/pay-cancelled", ctrlPayment.payCancelled);

module.exports = router;
