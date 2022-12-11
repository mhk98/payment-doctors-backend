const router = require("express").Router();
// const user = require('../../models/user/user');
const User = require("../../controllers/user/users.controller");
// const recharge = require('../../models/recharge/recharge');

// router.post('/', user.userInsert);
router.get("/cards/:id", User.getCardByUserId);

//queryCard45_req reqTS45queryCard
router.get("/queryCard45_req/:id/", User.reqTS45queryCard);
//queryOBU45_req
router.get("/queryOBU46_req/:id", User.reqTS45queryCard);

//cardRechAndConsump47_req req47cardRechAndConsump body require
router.post("/cardRechAndConsump47_req/", User.req47cardRechAndConsump);
router.post("/OBURechAndConsump47_req/", User.req47cardRechAndConsump);

//w
module.exports = router;
