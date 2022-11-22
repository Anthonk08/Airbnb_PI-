const mysqlService = require("../services/mysql");
const logService = require("../services/log");

const paypal = require("paypal-rest-sdk");

const payViaPaypal = async (req, res) => {
  const { propertyId, startDate, endDate } = req.body;

  var propertyInfo, userInfo;

  var propertyExist = false;

  var userId = req.session.user_id;

  //Valida si el id de la propiedad sea numerico
  if (isNaN(propertyId)) {
    logService.error("Parametros invalidos");
    res.redirect("/home");
    return;
  }

  //Informacion de la propiedad que se quiere alquilar
  try {
    propertyInfo = await mysqlService.getPropertyInfo(propertyId);

    if (propertyInfo != undefined) {
      propertyExist = true;
    } else {
      logService.error("La propierdad no existe.");
      res.redirect("/home");
      return;
    }
  } catch (error) {
    logService.error(error);
    res.redirect("/home");
  }

  //Informacion del usuario que desea alquilar
  try {
    userInfo = await mysqlService.getUserInfo(userId);

    if (userInfo == undefined) {
      logService.error("El usuario no existe.");
      res.redirect("/home");
      return;
    }
  } catch (error) {
    logService.error(error);
    res.redirect("/home");
  }

  // si la propiedad existe procede con el proceso de pago.
  if (propertyExist) {
    const transactionInfo = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "/pay-success",
        cancel_url: "/pay-cancelled",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: `${userInfo.name} ${userInfo.lastname}`,
                sku: `${propertyInfo.id}`,
                price: `${propertyInfo.price}`,
                currency: "DOP",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "DOP",
            total: `${propertyInfo.price}`,
          },
          description: "Alquiler de vivienda",
        },
      ],
    };

    paypal.payment.create(transactionInfo, function (error, payment) {
      if (error) {
        throw error;
      } else {
        try {
          mysqlService
            .makeReservation(userId, propertyId, startDate, endDate)
            .then((rentalId) => {
              var amount = transactionInfo.transactions[0].amount.total;

              var currentDate = moment().format("yyyy-mm-dd:hh:mm:ss");

              mysqlService.savePayment(
                userId,
                rentalId,
                payment.id,
                amount,
                currentDate
              );
            });
        } catch (error) {}

        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }
};

// si el pago se ha realizado cone exito, se devolvera los detalles de la compra
const paySuccess = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  //   const saleInfo = {
  //     payer_id: payerId,
  //     transactions: [
  //       {
  //         amount: {
  //           currency: "DOP",
  //           total: "25.00",
  //         },
  //       },
  //     ],
  //   };

  // Devuelve los detalles de la transaccion
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send("Success");
      }
    }
  );
};

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

module.exports = {
  paySuccess,
  payCancelled,
  payViaPaypal,
  payPalRefund,
};
