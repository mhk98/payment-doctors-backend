//initialize of router
const router = require('express').Router();
const cardtbl = require('../../controllers/cardtbl/cardtbl.controller');

//endpoint
router.get('/checkCard', cardtbl.getCardByUserId);
// router.get("/invalid", cardtbl);
router.post('/', cardtbl.cardtblInsert);
router.get('/lossCard', cardtbl.getCardByUserId);
//updateing the card on succesful recharge
//depriciated with a function in recharge controller where the cardtbl will be updated after successfull reacharge
router.post('/updateCard', cardtbl.updateOnsuccesfulRecharge);

//this is for our internal req
router.get('/checkCard41_req/:id', cardtbl.reqTS_41checkCard);

//reChargeCard42_req reqTS42reChargeCard
router.get('/reChargeCard42_req/:id', cardtbl.reqTS42reChargeCard);

//this is for checkOBU43
router.get('/checkOBU43_req/:id', cardtbl.reqTS_41checkCard);

//this is for reChargeOBU 44
router.get('/reChargeOBU44_req/:id', cardtbl.reqTS42reChargeCard);

// lossCard49_req reqTS49lossCard
router.get('/lostCard49_req/:id', cardtbl.reqTS49lostCard);

// unlockCard410_req reqTS410unlockCard
router.get('/unlockCard410_req/:id', cardtbl.reqTS410unlockCard);

//lcoal store routes
//QueryCard45_res_store res_store_QueryCard45
router.post('/QueryCard45_res_store/', cardtbl.res_store_QueryCard45);

module.exports = router;
