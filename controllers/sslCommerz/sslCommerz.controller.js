const express = require("express");
const { async } = require("rxjs");
const shortid = require("shortid");
const SSLCommerzPayment = require("sslcommerz-lts");
const { createResponse } = require("../../utils/responseGenerator");
const db = require("../../models");

const Success = db.success;
const Card = db.cardtbl;
const Fail = db.fail;
const Recharge = db.recharge;
const Refundtbl = db.refundtbl;
const sequelize = db.sequelize;

var card_number_local = 0;
module.exports.sslrequestInsert = async (req, res) => {
  // console.log(req.body);
  const { amount, card_no } = req.body;
  card_number_local = card_no;
  const transactionId = `${shortid.generate()}`;
  // console.log(TranId);
  const data = {
    total_amount: amount,
    card_number: card_no,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `https://payment-doctors-backend-production.up.railway.app/api/v1/sslcommerz/ssl-payment-success?transactionId=${transactionId}`,
    fail_url: `https://payment-doctors-backend-production.up.railway.app/api/v1/sslcommerz/ssl-payment-fail?transactionId=${transactionId}`,
    cancel_url: `https://payment-doctors-backend-production.up.railway.app/api/v1/sslcommerz/ssl-payment-cancel?transactionId=${transactionId}`,
    shipping_method: "No",
    product_name: "device_number.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    // value_c: 'ref003_C',
    value_d: "ref004_D",
    ipn_url:
      "https://payment-doctors-backend-production.up.railway.app/api/v1/sslcommerz/ssl-payment-notification",
  };
  // const sslcommerz = new SSLCommerzPayment(
  //   process.env.STORE_ID,
  //   process.env.STORE_PASSWORD,
  //   false
  // ); //true for live default false for sandbox
  // const result = await sslcommerz.init(data);
  // if (result?.GatewayPageURL) {
  //   return { TranId, GatewayPageURL: result.GatewayPageURL };
  // } else {
  //   return false;
  // }
  const sslcommer = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  ); //true for live default false for sandbox
  const r1 = await sslcommer.init(data);
  return res.status(200).json({
    success: true,
    data: r1,
  });
};

// module.exports.sslrequestInsert = async (req, res) => {
//   const { amount } = req.body;
//   // console.log(req.body);
//   const TranId = `${shortid.generate()}`;
//   // console.log(TranId);
//   const ddd = await demoFunc(amount, TranId);
//   //   // save information to database
//   res.json(ddd.GatewayPageURL);
// };

function rechargeInsertModel(data) {
  console.log(data);
  console.log(data.tran_id);
  let insertInstance = {
    id: 90048,
    BankType: 0,
    recharge_date: "2022-01-01 00:00:00",
    rechargeTime_end: "2022-01-01 00:00:00",
    recharge_Amount: 00,
    rechargepreAmount: 00,
    rechargepostAmount: 000,
    SSLStatus: "success",
    TransNumber: "TN",
    TSStatus: "",
    successTranId: null,
    failTranId: null,
    createdAt: "2022-04-18 03:17:11",
    updatedAt: "0000-00-00 00:00:00",
    cardtblId: 50002,
  };
  insertInstance.id = data.tran_id;
  if (data.status == "VALID") {
    insertInstance.successTranId = data.tran_id;
  } else {
    insertInstance.failTranId = data.tran_id;
  }
  insertInstance.SSLStatus = data.status;
  insertInstance.recharge_date = data.tran_date;
  insertInstance.BankType = data.card_type;
  insertInstance.cardtblId = card_number_local;
  insertInstance.recharge_Amount = data.amount;
  console.log(
    "--------------------------insertInstance--------------------------"
  );
  console.log(insertInstance);
  console.log(
    "--------------------------insertInstance--------------------------"
  );

  return insertInstance;
  // return Object.values(insertInstance);
}

async function updateCardtbl(rechargeInstance) {
  try {
    const CardUpdate = await Card.update(
      {
        last_chargeamounte: rechargeInstance.recharge_Amount,
        last_chargeTime: rechargeInstance.recharge_date,
      },
      {
        where: {
          TScardId: rechargeInstance.cardtblId,
        },
        returning: true,
        plain: true,
      }
    );
    if (CardUpdate[1] != 0) {
      console.log("card table updated");
      return { cardtbl: "UPdate OK" };
    }
  } catch (error) {
    console.log(error);
    return { cardtbl: "UPdate Fail" };
  }
}
module.exports.sslpaymentsuccessInsert = async (req, res) => {
  const { transactionId } = req.query;
  // console.log(req.body);
  const {
    tran_id,
    val_id,
    amount,
    card_type,
    store_amount,
    card_no,
    bank_tran_id,
    status,
    tran_date,
    currency,
    card_issuer,
    card_brand,
    card_sub_brand,
    card_issuer_country,
    card_issuer_country_code,
    verify_sign,
    currency_type,
    currency_amount,
    currency_rate,
  } = req.body;

  // const data = val_id;

  // const sslcz = new SSLCommerzPayment(process.env.STORE_ID,
  //   process.env.STORE_PASSWORD, false)
  // sslcz.validate(data).then(data => {
  //   console.log('valided response from sslcommerz', data)
  //   //process the response that got from sslcommerz
  //   // https://developer.sslcommerz.com/doc/v4/#order-validation-api
  // });

  const data = {
    val_id, //that you go from sslcommerz response
  };
  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  );
  const validatorRes = await sslcz.validate(data);
  const { status: validatorStatus } = validatorRes;
  if (validatorStatus === "VALID") {
    //do add your code here for store your data
    let rechargeInsertInstance = rechargeInsertModel(req.body);

    const SuccessfulPayment = await Success.create({
      tran_id,
      val_id,
      amount,
      card_type,
      store_amount,
      card_no,
      bank_tran_id,
      status,
      tran_date,
      currency,
      card_issuer,
      card_number: card_number_local,
      card_brand,
      card_sub_brand,
      card_issuer_country,
      card_issuer_country_code,
      verify_sign,
      currency_type,
      currency_amount,
      currency_rate,
    }).then((res) => {
      // console.log(res);
    });

    const succRecharge = await Recharge.create(rechargeInsertInstance).then(
      (res) => {
        // console.log(res);
      }
    );
    const cardtblUpdate = await updateCardtbl(rechargeInsertInstance);

    console.log("Congratulation for successfully data stored");
  } else {
    // return error message
    console.log("Someting went wrong data not store");
  }
  // console.log(req.body);
  // rechare de construsiton from ssl success

  res.redirect(
    `https://bangabandhutunnel.netlify.app/${transactionId}/${card_number_local}`
  );
};

// await insertIntoRecharge
async function insertIntoRecharge(ssl_success) {
  return "";
  try {
    const {
      id,
      BankType,
      recharge_date,
      rechargeTime_end,
      recharge_Amount,
      rechargepreAmount,
      rechargepostAmount,
      SSLStatus,
      TransNumber,
      TSStatus,
      cardtblId,
      successTranId,
    } = ssl_success.body;
    if (
      !id ||
      !BankType ||
      !recharge_date ||
      !rechargeTime_end ||
      !recharge_Amount ||
      !rechargepreAmount ||
      !rechargepostAmount ||
      !SSLStatus ||
      !TransNumber ||
      !TSStatus ||
      !cardtblId ||
      !successTranId
    ) {
      res.json(createResponse(true, null, "Parameter missing"));
    } else {
      const result = await Recharge.create({
        id,
        BankType,
        recharge_date,
        rechargeTime_end,
        recharge_Amount,
        rechargepreAmount,
        rechargepostAmount,
        SSLStatus,
        TransNumber,
        TSStatus,
        cardtblId,
        successTranId,
      });
      if (result) {
        res.json(createResponse(true, result, "Record inserted"));
        console.log(result);
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
}

// Find sslcommer sucessfull information using transactionId
module.exports.paymentsuccess = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  // let ssl_data_for_recjargetbl;
  // let recharge_insert_status;

  try {
    //gaurd condition
    if (!transactionId) {
      res.json(createResponse(null, "Card id missing", true));
    }
    // body has id
    else {
      const result = await Success.findOne({
        where: {
          tran_id: transactionId,
        },
        // include: [
        //   {
        //     model: User,
        //     // to check particular data by attributes
        //     // attributes: ['Device_Type']
        //   }
        // ]
      });

      if (result) {
        console.log(result);
        res.json(createResponse(result));
      } else {
        res.json(createResponse(null, "Card not found with this id", true));
      }
    }
  } catch (error) {
    next(error.message);
  }
};

// async Success.findByPk(transactionId)
//   .then((data) => {
//     if (data) {
//       ssl_data_for_recjargetbl = data;
//       recharge_insert_status = await insertIntoRecharge(ssl_data_for_recjargetbl);
//       res.send(data);
//     } else {
//       res.status(404).send({
//         message: 'Cannot find Success with tranid',
//       });
//     }
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message: 'Error retrieving Tutorial with id=' + id,
//     });
//   });
// }

// Find all transaction individual user using card_number
module.exports.allTransaction = async (req, res) => {
  const card_number = card_number_local;

  Success.findOne({ where: { tran_id: card_number } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find Success with card_number",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with card_number",
      });
    });
};

module.exports.sslpaymentnotifiactionInsert = async (req, res) => {
  return res.status(200).json({
    data: req.body,
    message: "Payment notification",
  });
};

module.exports.sslpaymentfailInsert = async (req, res) => {
  // let status = 'fail';
  // intimidiate_process(req.body, status);
  // console.log(req.body);
  // return res.status(200).json({
  //   data: req.body,
  //   message: 'Payment failed',
  // });

  const { transactionId } = req.query;

  let rechargeInsertInstance = rechargeInsertModel(req.body);

  // console.log(req.body);
  const {
    tran_id,
    amount,
    card_type,
    card_no,
    bank_tran_id,
    status,
    tran_date,
    currency,
    card_issuer,
    card_brand,
    card_sub_brand,
    card_issuer_country,
    card_issuer_country_code,
    verify_sign,
    currency_type,
    currency_amount,
    currency_rate,
  } = req.body;

  const failPayment = Fail.create({
    tran_id,
    amount,
    card_type,
    card_no,
    bank_tran_id,
    status,
    tran_date,
    currency,
    card_issuer,
    card_brand,
    card_sub_brand,
    card_issuer_country,
    card_issuer_country_code,
    verify_sign,
    currency_type,
    currency_amount,
    currency_rate,
  }).then((res) => {
    console.log("failed res", res);
  });

  const succRecharge = await Recharge.create(rechargeInsertInstance).then(
    (res) => {
      console.log(res);
    }
  );

  res.redirect(`https://bangabandhutunnel.netlify.app/fail/${transactionId}`);
  // return res.status(200).json({
  //   data: req.body,
  //   message: 'Payment failed',
  // });
};

// Find sslcommer failed information using transactionId
module.exports.paymentfail = async (req, res, next) => {
  const transactionId = req.params.transactionId;

  try {
    //gaurd condition
    if (!transactionId) {
      res.json(createResponse(null, "Card id missing", true));
    }
    // body has id
    else {
      const result = await Fail.findOne({
        where: {
          tran_id: transactionId,
        },
        // include: [
        //   {
        //     model: User,
        //     // to check particular data by attributes
        //     // attributes: ['Device_Type']
        //   }
        // ]
      });

      if (result) {
        console.log(result);
        res.json(createResponse(result));
      } else {
        res.json(createResponse(null, "Card not found with this id", true));
      }
    }
  } catch (error) {
    next(error.message);
  }
};

module.exports.sslcommerzRefundInsert = async (req, res) => {
  try {
    const {
      refund_amount,
      refund_remarks,
      bank_tran_id,
      refund_Date,
      account_Number,
    } = req.body;
    console.log(req.body);
    const refe_id = `${shortid.generate()}`;
    const data = {
      refund_amount,
      refund_remarks,
      bank_tran_id,
      refe_id,
    };

    console.log("refund requirement", data);

    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    );
    sslcz.initiateRefund(data).then((data) => {
      console.log("Refund info", data);
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
    });

    if (
      !id ||
      !refund_amount ||
      !refund_remarks ||
      !bank_tran_id ||
      !refund_Date ||
      !refe_id ||
      !account_Number
    ) {
      res.json(createResponse(true, null, "Parameter missing"));
    } else {
      // const result = await Refundtbl.create({
      //   id, refund_amount, refund_remarks, bank_transactionId, refund_Date, reference_Id, status, account_Number, account_Number, TS_refund_Id

      // });

      if (result) {
        res.json(createResponse(true, result, "Record inserted"));
        console.log(result);
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// Find sslcommer fail information using transactionId
// module.exports.paymentfail = async (req, res) => {
//   const transactionId = req.params.transactionId;

//   Fail.findByPk(transactionId)
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: 'Cannot find Success with tranid',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error retrieving Tutorial with id=' + id,
//       });
//     });
// };

module.exports.sslpaymentcancelInsert = async (req, res) => {
  /**
   * If payment cancelled
   */
  // let status = 'cancel';
  // intimidiate_process(req.body, status);

  return res.status(200).json({
    data: req.body,
    message: "Payment cancelled",
  });
};
