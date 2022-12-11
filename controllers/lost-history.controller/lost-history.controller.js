// import sequelize from 'sequelize';
const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
// const lost_history = require('../../models/lost_history/lost_history');
const Lost_history = db.lost_history;
const Card = db.cardtbl;
// const User= db.User;



module.exports.lost_historyInsert = async (req, res) => {
  try {
    const {
      Card_No,
      User_ID,
      Lost_Date,
      Last_Balance,
      Balance_Transferred,
      Card_Issue,
      Referred_to,
    } = req.body;

    if (
      !Card_No ||
      !User_ID ||
      !Lost_Date ||
      !Last_Balance ||
      !Balance_Transferred ||
      !Card_Issue ||
      !Referred_to
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Lost_history.create({
        Card_No,
        User_ID,
        Lost_Date,
        Last_Balance,
        Balance_Transferred,
        Card_Issue,
        Referred_to,
      });

      if (result) {
        res.json(createResponse(true, result, 'Record inserted'));
        (true);
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
    //  (error);
  }
};

//get all cards of a user using userID
module.exports.getLostHistoryByCardId = async (req, res, next) => {
  try {
    const { ID } = req.body;
    //gaurd condition 
    if (!ID) {
      res.json(createResponse(null, 'Card id missing', true));
    }
    // body has id 
    else {
      const result = await Card.findOne({
        where: {
          id: ID
        },
        include: [
          {
            model: Lost_history
          }
        ]
      });

      if (result) {
        res.json(createResponse(result))
      }
      else {
        res.json(createResponse(null, "Card not found with this id", true))
      }
    }
  }
  catch (error) {
    next(error.message)
  }
}
module.exports.getOnelostHistory = async (req, res, next) => {
  try {
    const { ID } = req.body;
    //gaurd condition 
    if (!ID) {
      res.json(createResponse(null, 'Card id missing', true));
    }
    // body has id 
    else {
      ("this is get lost history table by ID");
      ("this is get lost  ID:", ID);
      let tempID = 30002;
      const result = await Lost_history.findOne({
        where: {
          id: ID,
        }
      });
      // const result = await Lost_history.query("select * from lost_historytbls where cardtblId = 50016");

      if (result) {
        res.json(createResponse(result))
      }
      else {
        res.json(createResponse(null, "Card not found with this id", true))
      }
    }
  }
  catch (error) {
    (error);
    next(error.message)
  }
}

// get user card
// module.exports.getCardByUserId = async (req, res, next) => {
//   try {
//      ('ddd');
//     // const {email} = req.body
//     const req_id = req.body.id
//      (typeof(req_id))
//      (req.body.id)
//      (req_id)

//     const result = await Card.findOne({
//       where: {
//        id : req_id,
//       },
//       include: [
//         {
//           model: Lost_history,
//           // to check particular data by attributes
//           // attributes: ['Device_Type']
//         }
//       ]
//     });

//     res.json(createResponse(result))
//   }
//   catch(error){
//      ('user log error: \n',error)
//     next(error.message)
//   }
// }