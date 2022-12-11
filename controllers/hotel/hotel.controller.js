// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createResponse } = require("../../utils/responseGenerator");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../../models");

const Hotel = db.Hotel;

// {"code":200,"msg":"操作成功","data":{"user":"WEB","token":"eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqVsoqyVSyUjI0NjAzsQQBJR2l4tIkdKHM4mKgUElqckZ8RUVGvFd5CUgwsUTJytDMzNLM2NzM2FhHKbWiACRgbgATKC1OLQLqC3d1ApsRlJpWlFqcoWRVUlSaWgsAAAD__w.amw9gNUI104uJhYm_vWzsa1j9pxMbU4t7DYdUNIgtJk"}}

module.exports.hotelInsert = async (req, res) => {
  try {
    const { name, cat_id, etc } = req.body;
    if (!cat_id || !name || !etc) {
      res.json(createResponse(true, null, "Parameter missing"));
    } else {
      const result = await Hotel.create({
        name: name,
        cat_id,
        etc,
      });

      if (result) {
        res.json(createResponse(false, result, "Record inserted"));
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
}

// postChecker 
module.exports.postChecker = async (req, res) => {
  try {
    let req_post_body = req.body;
    console.log(req_post_body);
    res.json(createResponse(req_post_body, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};



// postChecker 
module.exports.postCheckerlogin = async (req, res) => {
  try {
    let req_post_body = req.body;
    let login_data = {
      "code": 200,
      "msg": "操作成功",
      "data": {
        "user": "WEB",
        "token": "eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqVsoqyVSyUjI0NjAzsQQBJR2l4tIkdKHM4mKgUElqckZ8RUVGvFd5CUgwsUTJytDMzNLM2NzM2FhHKbWiACRgbgATKC1OLQLqC3d1ApsRlJpWlFqcoWRVUlSaWgsAAAD__w.amw9gNUI104uJhYm_vWzsa1j9pxMbU4t7DYdUNIgtJk"
      }
    }

    console.log(req_post_body);
    res.json(createResponse(login_data, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker41 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body.id);
    let local_req_json_41_checkCard = {
      id: "112",
      chargeType: 1,
      idCard: "222222",
      PIN: "1111",
      verifyTime: "03:10:11",
      bankType: 0
    };
    //  (req_post_body);
    let responseFromTS_card = {
      id: "112",
      verifyStatus: 1,
      info: "card is OK",
      receiveTime: "2022-11-20 10:21:02",
    };

    let a = Object.keys(req_post_body);
    let b = Object.keys(local_req_json_41_checkCard);
    responseFromTS_card.id = req_post_body.id;

    res.json(createResponse(responseFromTS_card, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker43 = async (req, res) => {
  try {
    let req_post_body = req.body;
    let responseFromTS_OBU = {
      id: "112",
      verifyStatus: 1,
      info: "card is lost",
      receiveTime: "2022-11-20 10:21:02",
    };
    (req_post_body.id);
    responseFromTS_OBU.id = req_post_body.id
    // responseFromTS_OBU.verifyStatus = 
    res.json(createResponse(responseFromTS_OBU, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker42 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body);

    let responseFromTS_card = {
      id: "1123",
      chargeStatus: 1,
      info: "",
      receiveTime: "2022-11-24 07:00:57"
    };
    responseFromTS_card.id = req_post_body.id;
    res.json(createResponse(responseFromTS_card, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker44 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body);
    let responseFromTS_OBU = {
      id: "1123",
      chargeStatus: 2,
      info: "",
      receiveTime: "2022-11-24 07:00:57"
    };
    responseFromTS_OBU.id = req_post_body.id;
    res.json(createResponse(responseFromTS_OBU, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker45 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body);

    let req_json_45_queryCard = {
      accountType: 1,
      idCard: "144334",
      PIN: "1211",
      phoneNO: "01728839989",
    };

    let responseFromTS_card = {
      // responseFromTS_card ={
      accountId: 221,
      accountName: "mostofa",
      amount: 1700,
      cardList: [
        {
          cardNo: "11",
          cardStatus: 3,
          type: "MTC",
        },
        {
          cardNo: "12",
          cardStatus: 1,
          type: "MTC",
        },
        {
          cardNo: "13",
          cardStatus: 3,
          type: "MTC",
        },
      ],
    };


    responseFromTS_card.accountId = parseInt(req_post_body.phoneNO).toString();
    responseFromTS_card.cardList.forEach(element => {
      element.cardNo = (parseInt(req_post_body.phoneNO) + parseInt(element.cardNo)).toString();
    });

    res.json(createResponse(responseFromTS_card, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker46 = async (req, res) => {
  try {

    let req_json_45_queryCard = {
      accountType: 1,
      idCard: "144334",
      PIN: "1211",
      phoneNO: "01728839989",
    };

    let req_post_body = req.body;
    (req_post_body.phoneNO);

    let responseFromTS_OBU = {
      accountId: 221,
      accountName: "mostofa",
      amount: 1200,
      cardList: [
        {
          OBUNO: "21",
          cardStatus: 4,
          vehicleNo: "128819",
          type: "OBU",
        },
        {
          OBUNO: "22",
          cardStatus: 1,
          vehicleNo: "128219",
          type: "OBU",
        },
        {
          OBUNO: "23",
          cardStatus: 2,
          vehicleNo: "121219",
          type: "OBU",
        },
        {
          OBUNO: "24",
          cardStatus: 1,
          vehicleNo: "121219",
          type: "OBU",
        },
      ],
    };

    responseFromTS_OBU.accountId = parseInt(req_post_body.phoneNO).toString();
    responseFromTS_OBU.cardList.forEach(element => {
      element.OBUNO = (parseInt(req_post_body.phoneNO) + parseInt(element.OBUNO)).toString();
    });

    res.json(createResponse(responseFromTS_OBU, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker47 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body);

    let responseFromTS_card = {
      "accountId": "1509883803408007168",
      "accountType": 1,
      "dataList": [
        {
          "amount": 117.6000,
          "transTime": "2022-10-30T14:22:15",
          "operationType": 2,
          "preBalance": 5000.0000,
          "afterBalance": 4882.4000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 156.8000,
          "transTime": "2022-10-30T14:58:49",
          "operationType": 2,
          "preBalance": 9400.0000,
          "afterBalance": 9243.2000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 1500.0000,
          "transTime": "2022-11-29T10:51:41",
          "operationType": 1,
          "preBalance": 50.0000,
          "afterBalance": 1550.0000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 2000.0000,
          "transTime": "2022-11-29T11:28:55",
          "operationType": 1,
          "preBalance": 1550.0000,
          "afterBalance": 3550.0000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 2000.0000,
          "transTime": "2022-11-29T11:28:55",
          "operationType": 1,
          "preBalance": 1550.0000,
          "afterBalance": 3550.0000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 10.0000,
          "transTime": "2022-11-29T13:14:50",
          "operationType": 1,
          "preBalance": 3550.0000,
          "afterBalance": 3560.0000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 1111.0000,
          "transTime": "2022-11-29T13:39:06",
          "operationType": 1,
          "preBalance": 3560.0000,
          "afterBalance": 4671.0000,
          "cardNo": "2541122020009818"
        },
        {
          "amount": 1300.0000,
          "transTime": "2022-11-29T13:46:10",
          "operationType": 1,
          "preBalance": 4671.0000,
          "afterBalance": 5971.0000,
          "cardNo": "2541122020009818"
        }
      ],
      "endTransTime": "2022-11-29 22:02:12",
      "staTransTime": "2022-10-30 12:02:12"
    }

    responseFromTS_card.accountId = req_post_body.accountId;

    res.json(createResponse(responseFromTS_card, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker48 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body);

    let responseFromTS_OBU = {
      "accountId": "1506543328244531200",
      "accountType": 1,
      "dataList": [
        {
          "amount": 285.0000,
          "transTime": "2022-04-06T08:11:25",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1715.0000
        },
        {
          "amount": 114.0000,
          "transTime": "2022-04-06T20:52:43",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1886.0000
        },
        {
          "amount": 285.0000,
          "transTime": "2022-04-07T07:20:06",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1715.0000
        },
        {
          "amount": 114.0000,
          "transTime": "2022-04-07T16:10:37",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1886.0000
        },
        {
          "amount": 228.0000,
          "transTime": "2022-04-07T17:06:45",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1772.0000
        },
        {
          "amount": 285.0000,
          "transTime": "2022-04-08T07:33:40",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1715.0000
        },
        {
          "amount": 228.0000,
          "transTime": "2022-04-11T19:11:09",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1772.0000
        },
        {
          "amount": 285.0000,
          "transTime": "2022-04-12T07:48:36",
          "operationType": 2,
          "OBUNO": "2540221120035803",
          "preBalance": 2000.0000,
          "afterBalance": 1715.0000
        }
      ],
      "endTransTime": "2022-11-29 20:02:12",
      "staTransTime": "2022-03-30 12:02:12"
    }

    responseFromTS_OBU.accountId = req_post_body.accountId;

    res.json(createResponse(responseFromTS_OBU, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker49 = async (req, res) => {
  try {
    let req_post_body = req.body;
    (req_post_body);

    let responseFromTS_lostCard_s = {
      cardNo: "12344",
      lossStatus: 1,
      info: "card is marked lost",
    };
    let responseFromTS_lostCard_f = {
      cardNo: "12344",
      lossStatus: 2,
      info: "card is already marked lost",
    };

    let responseFromTS_lostCard = responseFromTS_lostCard_s;

    responseFromTS_lostCard.cardNo = req_post_body.cardNo;

    res.json(createResponse(responseFromTS_lostCard, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// postChecker 
module.exports.postChecker410 = async (req, res) => {
  try {
    let req_post_body = req.body;

    let local_req_json_410_unlockCard = {
      cardNo: "112",
      accountType: 1,
    };

    (req_post_body);

    let responseFromTS_lostCard_s = {
      cardNo: "12344",
      optStatus: 1,
      info: "card is marked normal",

    };

    let responseFromTS_lostCard_f = {
      cardNo: "12344",
      lossStatus: 2,
      info: "card is already marked normal",
    };

    let responseFromTS_lostCard = responseFromTS_lostCard_s;
    responseFromTS_lostCard.cardNo = req_post_body.cardNo;

    res.json(createResponse(responseFromTS_lostCard, "Record inserted", false));
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};
