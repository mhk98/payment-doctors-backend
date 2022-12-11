const { createResponse } = require("../../utils/responseGenerator");
const db = require("../../models");
const user = require("../../models/user/user");
const recharge = require("../../models/recharge/recharge");
const { async } = require("rxjs");
const { callTS } = require("../../utils/callTs");
const cardtbl = require("../../models/cardtbl/cardtbl");
const { it } = require("date-fns/locale");

const Card = db.cardtbl;
const User = db.user;
//accountcardtbls accountobutbls
const AccountCardtbls = db.accountcardtbl;
const AccountOBUtbls = db.accountobutbl;

const Recharge = db.recharge;
const sequelize = db.sequelize;

//yameek
//here we will create all the backend quries to make the POST req data 41 and 4.3
async function CPR41checkCard(Id) {
  let local_req_json_41_checkCard = {
    id: "112",
    chargeType: 1,
    idCard: "222222",
    PIN: "1111",
    verifyTime: "03:10:11",
    bankType: 0,
  };
  const result = await Card.findOne({
    attributes: ["id", "status", "Device_Type"],
    where: { id: Id.id },
    include: [
      {
        model: User,
        // to check particular data by attributes
        attributes: ["id", "User_Type", "PIN", "IDcard"], // 'User_Type','PIN','IDcard'
      },
    ],
  });
  if (result) {
    let val = result.toJSON().Device_Type == "OBU" ? "OBUNO" : "cardNo";
    local_req_json_41_checkCard[val] = result.toJSON().id.toString();

    local_req_json_41_checkCard.chargeType =
      result.toJSON().usertbl.User_Type === "individual" ? 1 : 2;
    local_req_json_41_checkCard.PIN =
      result.toJSON().usertbl.PIN != null ? result.toJSON().usertbl.PIN : "";
    local_req_json_41_checkCard.idCard =
      result.toJSON().usertbl.IDcard != null ? result.toJSON().usertbl.IDcard:"";
  } else {
  return {"msg":"Card not found with this id"};
  }
  // 	system generated data
  let dt = new Date();
  dt.setHours(dt.getHours() + 6);
  dt = dt.toISOString().split(".")[0];
  // yyyyMMddHHmmssSSS dt_id_format
  let dt_id_format = dt.replace(/[^\d]/gi, "");
  // YYYY-MM-DD HH:mm:ss
  let dt_verify_time_format = dt.split("T")[0] + " " + dt.split("T")[1];
  local_req_json_41_checkCard.id = result.toJSON().id.toString() + dt_id_format; // 		ID(MTC_no + datetime),
  local_req_json_41_checkCard.bankType = 0;
  local_req_json_41_checkCard.verifyTime = dt_verify_time_format; // 		VerifyTime,

  // console.log(local_req_json_41_checkCard);

  return local_req_json_41_checkCard;
}

//yameek
//utsho :: modifying for 4.4
//here we will create all the backend quries to make the POST req data 4.2 &4.4
async function CPR42reChargeCard(Id) {
  let local_req_json_42_checkCard = {
    id: "112", //
    chargeType: 1,
    idCard: "222222",
    PIN: "1111",
    amount: "1111",
    chargeTime: "03:10:11",
    bankType: 0,
  };
  const result = await Card.findOne({
    attributes: [
      "id",
      "last_chargeamounte",
      "last_chargeTime",
      "status",
      "Device_Type",
    ],
    where: { id: Id.id },
    include: [
      {
        model: User,
        // to check particular data by attributes
        attributes: ["id", "User_Type", "PIN", "IDcard"], // 'User_Type','PIN','IDcard'
      },
      // {
      //   model: Recharge,
      //   attributes: ['id','rechargeTime_end','recharge_Amount','rechargeStatus'], // id,rechargeTime_end,recharge_Amount,rechargeStatus
      // }
    ],
  });
  if (result) {

    let val = result.toJSON().Device_Type == "OBU" ? "OBUNO" : "cardNo";
    //  (result.toJSON().usertbl.User_Type);
    //for id bind
    local_req_json_42_checkCard[val] = result.toJSON().id.toString();
    //condition ? true_expression : false_expression
    local_req_json_42_checkCard.chargeType =
      result.toJSON().usertbl.User_Type === "individual" ? 1 : 2;
    local_req_json_42_checkCard.PIN =
      result.toJSON().usertbl.PIN != null ? result.toJSON().usertbl.PIN : "";
    local_req_json_42_checkCard.idCard =
      result.toJSON().usertbl.IDcard != null
        ? result.toJSON().usertbl.IDcard
        : "";
    local_req_json_42_checkCard.amount =
      result.toJSON().last_chargeamounte != null
        ? result.toJSON().last_chargeamounte
        : "";
    //creating the datetime formate according to the document 4.2
    let dt = new Date(result.toJSON().last_chargeTime);
    dt = dt.toISOString().split(".")[0];
    let dt_verify_time_format = dt.split("T")[0] + " " + dt.split("T")[1]; // 2022-02-01 21:17:11
    local_req_json_42_checkCard.chargeTime = dt_verify_time_format;
  } else {
    return {"msg":"Card not found with this id"};
  }

  let dt = new Date();
  dt.setHours(dt.getHours() + 6);
  // yyyyMMddHHmmssSSS dt_id_format
  dt = dt.toISOString().split(".")[0];
  let dt_id_format = dt.replace(/[^\d]/gi, "");
  // YYYY-MM-DD HH:mm:ss
  let dt_verify_time_format = dt.split("T")[0] + " " + dt.split("T")[1];

  local_req_json_42_checkCard.id = result.toJSON().id.toString() + dt_id_format; // 		ID(MTC_no + datetime),
  local_req_json_42_checkCard.bankType = 0;
  (local_req_json_42_checkCard);
  //  ("-----------------------json 42 result final---------------------------------");
  return local_req_json_42_checkCard;
  // return {"happy" : "true"}
}

//yameek
// checkCard41_req  reqTS_41checkCard
module.exports.reqTS_41checkCard = async (req, res, next) => {
  try {
    let reqjson = await CPR41checkCard(req.params);

    res.json(createResponse(reqjson));
  } catch (error) {
    next(error.message);
  }
};

//utsho
// reChargeCard42_req
module.exports.reqTS42reChargeCard = async (req, res, next) => {
  try {
    let reqjson = await CPR42reChargeCard(req.params);

    res.json(createResponse(reqjson));
    // res.json(createResponse(reqjson));
  } catch (error) {
    next(error.message);
  }
};

// get all cards of a user using userID
module.exports.getCardByUserId = async (req, res, next) => {
  try {
    const { id } = req.body;
    //gaurd condition
    if (!id) {
      res.json(createResponse(null, "Card id missing", true));
    }
    // body has id
    else {
      const result = await Card.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: User,
            // to check particular data by attributes
            // attributes: ['Device_Type']
          },
        ],
      });

      if (result) {
        (result);
        res.json(createResponse(result));
      } else {
        res.json(createResponse(null, "Card not found with this id", true));
      }
    }
  } catch (error) {
    next(error.message);
  }
};

module.exports.cardtblInsert = async (req, res) => {
  try {
    const {
      Card_No,
      Device_Type,
      Physical_ID,
      User_ID,
      Issue_Date,
      Expire_Date,
      amount,
      last_chargeamounte,
      last_chargeTime,
      status,
    } = req.body;
    if (
      !Card_No ||
      !Device_Type ||
      !Physical_ID ||
      !User_ID ||
      !Issue_Date ||
      !Expire_Date ||
      !amount ||
      !last_chargeamounte ||
      !last_chargeTime ||
      !status
    ) {
      res.json(createResponse(true, null, "Parameter missing"));
    } else {
      const result = await Card.create({
        Card_No,
        Device_Type,
        Physical_ID,
        User_ID,
        Issue_Date,
        Expire_Date,
        amount,
        last_chargeamounte,
        last_chargeTime,
        status,
      });
      if (result) {
        res.json(createResponse(false, result, "Record inserted"));
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

//updateCard updateOnsuccesfulRecharge
module.exports.updateOnsuccesfulRecharge = async (req, res) => {
  res.json(createResponse({ happy: "no" }));
  try {
    const {
      Card_No,
      Device_Type,
      Physical_ID,
      User_ID,
      Issue_Date,
      Expire_Date,
      amount,
      last_chargeamounte,
      last_chargeTime,
      status,
    } = req.body;
    if (
      !Card_No ||
      !Device_Type ||
      !Physical_ID ||
      !User_ID ||
      !Issue_Date ||
      !Expire_Date ||
      !amount ||
      !last_chargeamounte ||
      !last_chargeTime ||
      !status
    ) {
      res.json(createResponse(true, null, "Parameter missing"));
    } else {
      const result = await Card.create({
        Card_No,
        Device_Type,
        Physical_ID,
        User_ID,
        Issue_Date,
        Expire_Date,
        amount,
        last_chargeamounte,
        last_chargeTime,
        status,
      });
      if (result) {
        res.json(createResponse(false, result, "Record inserted"));
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};


//adding guard condition 49
async function CPR49lostCard(Id) {
  let local_req_json_49_lossCard = {
    cardNo: "112",
    accountType: 1,
  };
  try {
    const result = await Card.findOne({
      attributes: ["id", "status", "Device_Type"],
      where: { id: Id.id },
      include: [
        {
          model: User,
          attributes: ["id", "User_Type", "PIN", "IDcard"],
        },
      ],
    });
    if (result) {
      // attributes: ['id','status'],
      local_req_json_49_lossCard.cardNo = result.toJSON().id.toString();
      //condition ? true_expression : false_expression
      local_req_json_49_lossCard.accountType =
        result.toJSON().usertbl.User_Type === "individual" ? 1 : 2;
    } else {
      ("Card not found with this id");
      return { "status": "Card not found with this id" }
    }
  } catch (error) {
    (error);
    return { "status": "sql error" }
  }
  return local_req_json_49_lossCard;
}

// lossCard49_req reqTS49lossCard
//utsho
// reChargeCard42_req
module.exports.reqTS49lostCard = async (req, res, next) => {
  try {
    //guard condition
    if (!req.params.id) {
      res.json(createResponse(null, ' card not found with this id', true));
    }

    let reqjson = await CPR49lostCard(req.params);
    res.json(createResponse(reqjson));
  } catch (error) {
    next(error.message);
  }
};

//CPR410unlockCard
async function CPR410unlockCard(Id) {

  let local_req_json_410_unlockCard = {
    cardNo: "112",
    accountType: 1,
  };
 

  const result = await Card.findOne({
    attributes: ["id", "status", "Device_Type"],
    where: { id: Id.id },
    include: [
      {
        model: User,
        // to check particular data by attributes
        attributes: ["id", "User_Type", "PIN", "IDcard"], // 'User_Type','PIN','IDcard'
      },
    ],
  });
  if (result) {

    local_req_json_410_unlockCard.cardNo = result.toJSON().id.toString();
    ("card id from db", result.toJSON().id.toString());
    //condition ? true_expression : false_expression
    local_req_json_410_unlockCard.accountType =
      result.toJSON().usertbl.User_Type === "individual" ? 1 : 2;
  } else {
    return {"msg":"Card not found with this id"};

  }
  return local_req_json_410_unlockCard;
}

// unlockCard410_req reqTS410unlockCard
//utsho
// reChargeCard42_req
module.exports.reqTS410unlockCard = async (req, res, next) => {
  try {
    
    let reqjson = await CPR410unlockCard(req.params);

    res.json(createResponse(reqjson));
  } catch (error) {
    next(error.message);
  }
};


//storing card info from account status page.
async function checkInsertOrUpdate(uid, item) {
  //card tbl insert instace 
  let cardtbl_model = {
    id: 13413413415,
    Device_Type: "OBU",
    Physical_ID: "XXXXXXX",
    Issue_Date: "2020-01-01 00:00:00",
    Expire_Date: "2022-02-02 00:00:00",
    last_chargeamounte: 000,
    last_chargeTime: "2022-02-02 03:17:11",
    status: "active",
	  Vehicle: "",
    TScardId: "",
    createdAt: "2000-01-01 00:00:00",
    usertblId: 100,
  };
  //feeding into insert instance 
  cardtbl_model.Device_Type = item.type;
  cardtbl_model.usertblId = uid;
  cardtbl_model.status = item.cardStatus;
  if (item.type == "OBU") {
    cardtbl_model.TScardId = item.OBUNO;
    cardtbl_model.Vehicle = item.vehicleNo;
  } else {
    cardtbl_model.TScardId = item.cardNo;
  }
  cardtbl_model.id = cardtbl_model.TScardId;
  // console.log("card insert  :: ",cardtbl_model);

  // cardtbl findone by uid 
  // if not found then insert 
  try {
    const card = await Card.findOne({
      where: { usertblId: uid, TScardId: cardtbl_model.TScardId },
    });
  
    if (card === null) {
      try {
          // inserting into the cardtbl
        const cardCreate = await Card.create(cardtbl_model);
        if (cardCreate) {
          return {"msg":"card create success"};
        } else {
          return {"msg":"card create  fail!"};
        }
      } catch (error) {
        return {"sqlError": error.message};
      }
    } else {
      try {
        const CardUpdate = await Card.update({
          status: cardtbl_model.status
        },
          {
            where: {
              usertblId: cardtbl_model.usertblId,
              TS_CardID: cardtbl_model.TScardId
            },
            returning: true,
            plain: true
          });
        if (CardUpdate[1] != 0) {
          // ("card updated!");
          return {"msg":"card update success"};
        }else{
          return {"msg":"no changes"};
        }
      } catch (error) {
        return {"sqlError": error.message}
      }
    }   
  } catch (error) {
    return {"CardTBLError": error.message}
  }
  
}

async function addCardUser45(local_data) {
  const { uid } = local_data.post_req;
  const { all_card } = local_data.post_req;
  // let checkCard_info = await checkInsertOrUpdate(uid,all_card[0]);
  await all_card.forEach((item) => {
    checkCard_info = checkInsertOrUpdate(uid, item);
  });
}

// store of data -------------------------------------------------------------------------
//store the user accountID

async function store_acc_Card(MTC, uid){
  try {
    /*
    "id"
    "TSaccountId"
    "acBalance"
    "createdAt"
    "usertblId"
    */
    let acc_card_instance = {
    "id" : "",
    "TSaccountId": "",
    "acBalance" :" ",
    "usertblId" : ""
    }
    //instance update.
    acc_card_instance.id= MTC.accountId;
    acc_card_instance.TSaccountId = MTC.accountId;
    acc_card_instance.usertblId = uid;
    acc_card_instance.acBalance = MTC.amount
    //
    let acc_card_q = await AccountCardtbls.findOne({
      where: { usertblId: uid, TSaccountId: MTC.accountId },
    });
  
    if (acc_card_q === null) {
      try {
          // inserting into the cardtbl
        const acc_card_create = await AccountCardtbls.create(acc_card_instance);
        if (acc_card_create) {
          return {"msg":"acc card create success"};
        } else {
          return {"msg":"acc card create fail"};
        }
      } catch (error) {
        return {"sqlError": error.message}
      }
    } else {
     try {
      const acc_card_update = await AccountCardtbls.update({
        acBalance: MTC.amount
      },
        {
          where: {
            usertblId: uid,
            TSaccountId: MTC.accountId
          },
          returning: true,
          plain: true
        });
      if (acc_card_update[1] != 0) {
        return {"msg":"acc card update success"};
      }
      else{
        return {"msg":"no changes"};
      }
     } catch (error) {
      return {"sqlError": error.message}
     }
    }   
  } catch (error) {
    return {"asyncError": error.message}
  }
}

async function store_acc_obu(OBU, uid){
  try {
    /*
    "id"
    "TSaccountId"
    "acBalance"
    "createdAt"
    "usertblId"
    */
    let acc_obu_instance = {
      "id" : "",
    "TSaccountId": "",
    "acBalance" :" ",
    "usertblId" : ""
    }
    //instance update.
    acc_obu_instance.id= OBU.accountId;
    acc_obu_instance.TSaccountId = OBU.accountId;
    acc_obu_instance.usertblId = uid;
    acc_obu_instance.acBalance = OBU.amount
    //
    let acc_card_q = await AccountOBUtbls.findOne({
      where: { usertblId: uid, TSaccountId: OBU.accountId },
    });
  
    if (acc_card_q === null) {
      try {
          // inserting into the cardtbl
        const acc_card_create = await AccountOBUtbls.create(acc_obu_instance);
        if (acc_card_create) {
          return {"msg":"acc OBU create success"};
        } else {
          return {"msg":"acc OBU create fail"};
        }
      } catch (error) {
        return {"sqlError": error.message}
      }
    } else {
     try {
      const acc_obu_update = await AccountOBUtbls.update({
        acBalance: OBU.amount
      },
        {
          where: {
            usertblId: uid,
            TSaccountId: OBU.accountId
          },
          returning: true,
          plain: true
        });
      if (acc_obu_update[1] != 0) {
        return {"msg":"acc OBU update success"};
      }
      else{
        return {"msg":"no changes"};
      }
     } catch (error) {
      return {"sqlError": error.message}
     }
    }   
  } catch (error) {
    return {"asyncError": error.message}
  }
}


async function storeUser_accoundID(local_data) {
  // const { id } = local_data;
  const { MTC, OBU } = local_data.post_req.userInfo;
  const { uid } = local_data.post_req;

  let acc_card;
  let acc_obu;
  if (MTC !== null) {
    acc_card =await store_acc_Card(MTC,uid);
    console.log(acc_card);
  } 

  if (OBU !== null) {
    acc_obu =await store_acc_obu(OBU, uid);
    console.log(acc_obu);
  }
  return {"MTC":acc_card,"OBU":acc_obu}
}

//for updating function in 45
// res_store_QueryCard45
module.exports.res_store_QueryCard45 = async (req, res) => {

  let localDataCarrier = req.body;
  let userUPdate = await storeUser_accoundID(localDataCarrier);
  let card_add_status = await addCardUser45(localDataCarrier);

  res.json(createResponse({ happy: "true" }));
  
};
