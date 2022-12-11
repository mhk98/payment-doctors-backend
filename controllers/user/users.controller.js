const db = require("../../models");
require("dotenv").config();
const { createResponse } = require("../../utils/responseGenerator");
const { getJWT } = require("../../utils/jwt_token");
const { retry } = require("rxjs");
const https = require("https");
const callTs = require("../../utils/callTs");
const { hashIt, compareIt }  = require("../../utils/bycript");


const User = db.user;
const Card = db.cardtbl;

// register shariar boilerplate
module.exports.register = async (req, res) => {
  try {
    const {
      User_Type,
      User_Name,
      Authorized_Name,
      User_Email,
      IDcard,
      Mobile_No,
      pass_word,
    } = req.body.CreateUser;
    // (req.body.CreateUser);
    // ("mobile no. > ", Mobile_No);

    if (!Mobile_No || !pass_word) {
      //createResponse : data,message,error
      res.json(createResponse(null, "Mobile_No or password required", true));
    } else {
      const checkUser = await User.findOne({
        where: {
          Mobile_No: Mobile_No,
        },
      });
      if (checkUser) {
        res.json(createResponse(null, "User Already Exists", true));
      } else {
      //ameek bhai help
      //module.exports = { hashIt, compareIt}; bycript

      // const hashedPass = await User.getHashPass(pass_word);
      // const hashedPass = await hashIt(pass_word);

        const data = await User.create({
          User_Type,
          User_Name,
          Authorized_Name,
          User_Email,
          IDcard,
          Mobile_No,
          pass_word,
        });

        if (data) {
          res.json(
            // createResponse : data,message,error
            createResponse(
              null,
              "User Registration Successful! Please Check Your Mobile_No"
            )
          );
        }
      }
    }
  } catch (error) {
    // createResponse : data,message,error
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// verify user shariar boilerpalte
module.exports.verifyUser = async (req, res) => {
  const { confirmationcode } = req.headers;

  try {
    const exist = await User.findOne({
      where: {
        confirmationCode: confirmationcode,
      },
    });

    if (exist.status !== "Active") {
      const updated = await User.update(
        { status: "Active" },
        {
          where: {
            confirmationCode: confirmationcode,
          },
        }
      );

      const message = `<p>Dear ${exist.fullName}</p>
      <p>Your account has been activated! You can now login to the system</p>
      `;
      const subject = "Account activation successfull";

      if (updated) {
        sendMobile_No(exist.Mobile_No, message, subject);
        res.json(createResponse(null, "Account Verification Successfull"));
      }
    } else {
      res.json(createResponse(null, "Account already activated", true));
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};



//calling webTokenCall
async function webTokenCall() {
  try {
    // const data  = await callTS("http://localhost:4000/api/v1//ts_api/login?username=WEB&password=96334a1ee90d9be73092ab48e23c6347",)
    const data = await callTS("http://192.168.0.10:8080/login?username=WEB&password=96334a1ee90d9be73092ab48e23c6347",)
    let jsonData = JSON.parse(data);
    (jsonData.data.token);
    return jsonData.data.token;
  } catch (error) {
    // (error)
    res.json(createResponse(null, `${error.message}`, true));

    // return { "token": ":(" }
  }

}

//calling webTokenCall
async function webTokenCallJSON() {
  try {
    // const data  = await callTS("http://localhost:4000/api/v1//ts_api/login?username=WEB&password=96334a1ee90d9be73092ab48e23c6347",)
    // const data = await callTS("http://192.168.0.10:8080/login?username=WEB&password=96334a1ee90d9be73092ab48e23c6347",)
    const data = {
      "code": 200,
      "msg": "操作成功",
      "data": {
        "user": "WEB",
        "token": "eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqVsoqyVSyUjI0NjAzsQQBJR2l4tIkdKHM4mKgUElqckZ8RUVGvFd5CUgwsUTJytDMzNLMyNTAzFRHKbWiACRgbgATKC1OLQLqC3d1ApsRlJpWlFqcoWRVUlSaWgsAAAD__w.uTawCjwsecA8gmD5m0c9Mp8kajwazClwAJhhwsuCBHU"
      }
    };
    let jsonData = data;   //JSON.parse(data);
    return jsonData.data.token;
  } catch (error) {
    // res.json(createResponse(null, `${error.message}`, true));
    return { "token": ":(" }
  }

}

// login
module.exports.login = async (req, res) => {
  const { Mobile_No, password } = req.body;
  if (!Mobile_No || !password) {
    res.json(createResponse(null, "Mobile_No or password missing", true));
  }
  try {
    const user = await User.findOne({
      where: {
        Mobile_No: Mobile_No,
      },
    });

    if (!user) {
      res.json(
        createResponse(null, "User does not found with the Mobile_No", true)
      );
    } else {
      const isValid = await user.validPassword(password, user.pass_word);
      // const isValid = await compareIt(password, user.pass_word);

      // const isValid = user.pass_word === password;
      //mostofa eidit token => user all information
      const token = getJWT(
        user.User_Email,
        user.Mobile_No,
        user.User_FirstName,
        user.User_LastName,
        user.id
      );
      if (isValid) {
        const { dataValues } = user;
        const { pass_word, ...rest } = dataValues;
        rest.token = token;
        // let webToken_d = await webTokenCall(); //ts_live
        let webToken_d = await webTokenCallJSON(); //local
        //webTokenCallJSON
        rest.webtoken = webToken_d;
        res.json(createResponse(rest, "Login Successful"));
      } else {
        res.json(createResponse(null, "Password doesn't matched", true));
      }
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const userMobile_No = req.Mobile_No;
    if (!userMobile_No) {
      res.json(createResponse(null, "User already logged out", true));
    }
    const user = await User.findOne({
      where: {
        Mobile_No: userMobile_No,
      },
    });

    if (!user) {
      res.json(
        createResponse(null, "User does not found with the Mobile_No", true)
      );
    } else {
      const { dataValues } = user;
      const { fullName, Mobile_No, country, status, uid, phone } = dataValues;
      res.json(
        createResponse({ fullName, Mobile_No, country, status, uid, phone })
      );
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// reset password  ------------------reset
module.exports.resetPassword = async (req, res) => {
  const { newPassword, Mobile_No } = req.body;
  //   const uid = req.userId;
  if (!newPassword) {
    res.json(
      createResponse(null, "please give password", true)
    );
  }

  try {
    const user = await User.findOne({
      where: {
        Mobile_No: Mobile_No,
      },
    });
    if (!user) {
      res.json(createResponse(null, "User not found", true));
    }

    const isValid = await user.validPassword(oldPassword, user.password);
    // const isValid = await compareIt(oldPassword, user.password);

    if (isValid) {
       const hashedPass = await user.getHashPass(newPassword);
        // const hashedPass = newPassword;
      await User.update(
        { pass_word: hashedPass },
        {
          where: {
            Mobile_No: Mobile_No,
          },
        }
      );
      res.json(createResponse(null, "Password upadated successfully"));
    } else {
      res.json(createResponse(null, "user not found", true));
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// refresh token shariar boilerplate
module.exports.refreshToken = async (req, res) => {
  const Mobile_No = req.params;
  if (!Mobile_No) {
    res.json(createResponse(null, "Unauthorized", true));
  } else {
    const token = getJWT(Mobile_No);
    //webcall webTokenCall

    res.json(createResponse(token));
  }
};

// get user card by user
module.exports.getCardByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Card,
        },
      ],
    });

    res.json(createResponse(result));
  } catch (error) {
    next(error.message);
  }
};

// Get operation for fetch data in ui
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

async function CPR45queryCard(ID) {
  let req_json_45_queryCard = {
    accountType: 1,
    idCard: "144334",
    PIN: "1211",
    phoneNO: "01728839989",
  };
  const user = await User.findOne({
    attributes: ["id", "User_Type", "PIN", "IDcard", "Mobile_No"],
    where: { id: ID.id },
  });

  if (!user) {
    res.json(
      createResponse(null, "User does not found with the Mobile_No", true)
    );
  } else {
    //  (user.toJSON());
    req_json_45_queryCard.accountType =user.toJSON().User_Type == "individual" ? 1 : 2;
    req_json_45_queryCard.idCard =user.toJSON().IDcard != null ? user.toJSON().IDcard : "";
    req_json_45_queryCard.PIN =user.toJSON().PIN != null ? user.toJSON().PIN : "";
    req_json_45_queryCard.phoneNO = user.toJSON().Mobile_No;
  }
  return req_json_45_queryCard;
  // return {"happy":"true"}
}

//queryCard45_req reqTS45queryCard
//this is the call for the 4.5 and 4.6
module.exports.reqTS45queryCard = async (req, res, next) => {
  // http://localhost:4000/api/v1/user/queryCard45_req/104
  try {
    // this is the request body for 4.5 4.6
    let reqjson = await CPR45queryCard(req.params);

    res.json(createResponse(reqjson));
  } catch (error) {
    next(error.message);
  }
};

//CPRcardRechAndConsump
async function CPR47cardRechAndConsump(req) {
  //todo need to req body undefined or null field
  let req_json_47_CRC = {
    accountId: "12344",
    accountType: 1,
    staTransTime: "2022-11-20 10:21:02",
    endTransTime: "2022-11-20 10:21:02",
  };
  req_json_47_CRC.accountId = req.accountId;

  let dt_start = new Date(req.endTransTime);

  dt_start = dt_start.toISOString().split(".")[0];
  let dt_staTransTime = dt_start.split("T")[0] + " " + dt_start.split("T")[1]; // 2022-02-01 21:17:11
  req_json_47_CRC.staTransTime = dt_staTransTime;

  let dt_end = new Date(req.staTransTime);

  dt_end = dt_end.toISOString().split(".")[0];
  let endTransTime = dt_end.split("T")[0] + " " + dt_end.split("T")[1]; // 2022-02-01 21:17:11
  req_json_47_CRC.endTransTime = endTransTime;
  // ! here the front end must return given data with calling  queryCard45_req api/:uid
  const user = await User.findOne({
    attributes: ["id", "User_Type", "PIN", "IDcard", "Mobile_No"],
    where: { id: req.id },
  });

  if (!user) {
    res.json(
      createResponse(null, "User does not found with the Mobile_No", true)
    );
  } else {
    req_json_47_CRC.accountType = user.toJSON().User_Type == "individual" ? 1 : 2;
  }
  return req_json_47_CRC;
}

//cardRechAndConsump47_req req47cardRechAndConsump
module.exports.req47cardRechAndConsump = async (req, res, next) => {
  // http://localhost:4000/api/v1/user/cardRechAndConsump47_req/104
  try {
    let reqjson = await CPR47cardRechAndConsump(req.body);
    res.json(createResponse(reqjson));
  } catch (error) {
    next(error.message);
  }
};
