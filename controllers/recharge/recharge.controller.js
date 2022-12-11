const { Op } = require('sequelize');
const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
const { async } = require('rxjs');
const Recharge = db.recharge;
const Card = db.cardtbl;
const Success = db.success;
const fail = db.fail;

// Post operation for insert data
module.exports.rechargeInsert = async (req, res) => {
  try {
    const {
      id,
      BankType,
      recharge_date,
      rechargeTime_Start,
      rechargeTime_end,
      recharge_Amount,
      rechargepreAmount,
      rechargepostAmount,
      rechargeStatus,
    } = req.body;
    if (
      !id ||
      !BankType ||
      !recharge_date ||
      !rechargeTime_Start ||
      !rechargeTime_end ||
      !recharge_Amount ||
      !rechargepreAmount ||
      !rechargepostAmount ||
      !rechargeStatus
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Recharge.create({
        id,
        BankType,
        recharge_date,
        rechargeTime_Start,
        rechargeTime_end,
        recharge_Amount,
        rechargepreAmount,
        rechargepostAmount,
        rechargeStatus,
      });

      if (result) {
        res.json(createResponse(true, result, 'Record inserted'));
        console.log(result);
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// Get operation for fetch data in ui

// module.exports.getRechargeById = async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       res.json(createResponse(null, 'recharge card not found', true));
//     }

//     else {
//       const result = await Recharge.findOne({
//         where: {
//           id: id
//         }

//       });

//       if (result) {
//         res.json(createResponse(result))
//       }
//       else {
//         res.json(createResponse(null, "Card can not be recharged", true))
//       }
//     }
//   }
//   catch (error) {
//     next(error.message)
//   }
// }

//getting previous date for 4.11 billcard api

// to do 4.11
module.exports.getRechargeByTime = async (req = null, res, next) => {
  try {
    let startOfDateRange = new Date();
    startOfDateRange.setHours(8, 0, 0, 0);

    let endOfDateRange = new Date();
    endOfDateRange.setDate(endOfDateRange.getDate() - 1);
    endOfDateRange.setHours(8, 0, 0, 0);

    const result = await Recharge.findAll({
      where: {
        rechargeStatus: 'success',
        recharge_date: {
          [Op.and]: {
            [Op.gte]: endOfDateRange,
            [Op.lte]: startOfDateRange,
          },
        },
      },
    });

    res.json(createResponse(result));
  } catch (error) {
    next(error);
  }
};

// module for date time check

// get all cards of a user using card no
module.exports.getRechargeById = async (req, res, next) => {
  try {
    //card no
    const { id } = req.body;
    //gaurd condition
    if (!id) {
      res.json(createResponse(null, 'rechage card not found', true));
    }
    // body has id
    else {
      const result = await Card.findOne({
        where: {
          //checking whether id is matching
          id: id,
        },
        include: [
          {
            model: Recharge,
            // to check particular data by attributes
            // attributes: ['Device_Type']
          },
        ],
      });

      if (result) {
        res.json(createResponse(result));
      } else {
        res.json(createResponse(null, 'Card not found with this id', true));
      }
    }
  } catch (error) {
    next(error.message);
  }
};

// get all cards of a user using userID
module.exports.getSslcommerzDataByTranID = async (req, res, next) => {
  try {
    console.log('ssl success to recharge called with req body');
    const { transID } = req.params;
    console.log('transid from recharge table', req.params);
    // console.log(transID);
    // console.log(req.body);
    //gaurd condition
    if (!transID) {
      res.json(createResponse(null, 'Data id missing', true));
    }
    // body has id
    else {
      const result = await Success.findOne({
        where: {
          tran_id: transID,
        },
        include: [
          {
            model: Success,
            // to check particular data by attributes
            // attributes: ['Device_Type']
          },
        ],
      });
      if (result) {
        console.log(result);
        res.json(createResponse(result));
      } else {
        res.json(
          createResponse(null, 'Data not found with this transID', true),
        );
      }
    }
  } catch (error) {
    next(error.message);
  }
};

async function storeTSrecharge42(tsData) {
  try {
    let rechargeInstance = {
      "id": "172884000020221127182143",
      "chargeStatus": 1,
      "chargeTime": "2022-11-24 07:00:57"
    }
    //prepareing instance 
    rechargeInstance.id = tsData.id;
    rechargeInstance.chargeStatus = tsData.chargeStatus;


    const rechargeUpdate = await Recharge.update({
      TSStatus: '',
      rechargeTime_end: "",
      TransNumber: ''
    },
      {
        where: {
          TS_CardID: rechargeInstance.cardtblId,
        },
        returning: true,
        plain: true
      });
    if (rechargeUpdate[1] != 0) {
      console.log('card table updated');
      return { recharge: 'UPdate OK' };
    }
  } catch (error) {
    console.log(error);
    return { cardtbl: 'UPdate Fail' };
  }
}

//recharge42_res_store  res_store_recharge42
module.exports.res_store_recharge42 = async (req, res, next) => {

  try {
    //console.log(req.body);
    let resPonse = { "happy": true }


    res.json(createResponse(req.body, 'api ready', false));


    // console.log('ssl success to recharge called with req body');
    // const { transID } = req.params;
    // // console.log(req.params);
    // // console.log(transID);
    // // console.log(req.body);
    // //gaurd condition
    // if (!transID) {
    //   res.json(createResponse(null, 'Data id missing', true));
    // }
    // // body has id
    // else {
    //   const result = await Success.findOne({
    //     where: {
    //       tran_id: transID,
    //     },
    //     include: [
    //       {
    //         model: Success,
    //         // to check particular data by attributes
    //         // attributes: ['Device_Type']
    //       },
    //     ],
    //   });
    //   if (result) {
    //     console.log(result);
    //     res.json(createResponse(result));
    //   } else {
    //     res.json(
    //       createResponse(null, 'Data not found with this transID', true),
    //     );
    //   }
    // }
  } catch (error) {
    next(error.message);
  }
};

