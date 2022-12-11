const router = require("express").Router();
const hotel = require("../../controllers/hotel/hotel.controller");

// router.post("/", hotel.hotelInsert);

router.post("/login", hotel.postCheckerlogin);
router.post("/bank/checkCard", hotel.postChecker41);
router.post("/bank/checkOBU", hotel.postChecker43);
router.post("/bank/reChargeCard", hotel.postChecker42);
router.post("/bank/reChargeOBU", hotel.postChecker44);
router.post("/web/queryCard", hotel.postChecker45);
router.post("/web/queryOBU", hotel.postChecker46);
router.post("/web/cardRechAndConsump", hotel.postChecker47);
router.post("/web/obuRechAndConsump", hotel.postChecker48);
router.post("/web/lossCard", hotel.postChecker49);
router.post("/web/unlockCard", hotel.postChecker410);
// router.post("/bank/billCard", hotel.postChecker);
// router.post("/bank/billOBU", hotel.postChecker);
// router.post("/bank/mojaBillOBU", hotel.postChecker);
// router.post("/bank/mojaBillCard", hotel.postChecker);
// router.post("/bank/checkBillCard", hotel.postChecker);
// router.post("/bank/checkBillOBU", hotel.postChecker);
// router.post("/", hotel.postChecker);

module.exports = router;
