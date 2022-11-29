const mysqlService = require("../services/mysql");
const logService = require("../services/log");
const paypal = require("../services/paypal");
const moment = require("moment");

// para cuando el usuario cancele una reservacion
const payPalRefund = (req, res) => {
  const { rentalId } = req.body;

  var refundReq = {
    amount: {
      currency: "USD",
      total: "0.01",
    },
  };

  paypal.sale.refund(saleId, refundReq, function (error, refund) {
    if (error) {
      throw error;
    } else {
      console.log("Refund Sale Response");
      console.log(JSON.stringify(refund));
    }
  });
};

const payCancelled = (req, res) => res.send("Cancelled");

// create a new order
const makeOrder = async (req, res) => {
  const { amount } = req.body;

  const order = await paypal.createOrder(amount);
  res.json(order);
};

// capture payment & store order information or fullfill order
const captureOrder = async (req, res) => {
  req.session.sessionSuccess = "";
  const { orderID } = req.params;
  const { propertyId, checkinDate, checkoutDate, amount } = req.body;
  var captureData, userTransacDB, addPaymentDB;

  // console.log("BODY:", req.body);
  try {
    captureData = await paypal.capturePayment(orderID);
    console.log("PAGO VIA PAYPAL REALIZADO, CREANDO RECERVACION...");
    userTransacDB = await mysqlService.makeReservation(
      req.session.user_id,
      propertyId,
      moment(checkinDate).format(),
      moment(checkoutDate).format()
    );

    console.log("GUARDANDO PAGO DEL USUARIO...");
    // Se registra el pago en la base de datos.
    addPaymentDB = await mysqlService.savePayment(
      req.session.user_id,
      userTransacDB,
      captureData.id,
      amount,
      moment().format()
    );

    console.log("RESERVACION REALIZADA CON EXITO");
  } catch (error) {
    console.log(error);
    res.redirect("/search-bookings");
    return;
  }
  req.session.sessionSuccess = "Reservacion realizada con exito";

  // res.redirect(`/lodging-profile?id=${propertyId}`);
  var message = req.session.sessionSuccess;
  res.send({ message });
};

module.exports = {
  payCancelled,
  payPalRefund,
  makeOrder,
  captureOrder,
};
