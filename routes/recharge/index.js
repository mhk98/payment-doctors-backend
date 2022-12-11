const router = require('express').Router();
const recharge = require('../../controllers/recharge/recharge.controller');
// const lost_history = require('../../models/lost_history/lost_history');
// const recharge = require('../../models/recharge/recharge');

router.post('/', recharge.rechargeInsert);
router.get('/reChargeCard', recharge.getRechargeById);
router.get('/cardReachAndConsump', recharge.getRechargeById);
//storting the response of 
//recharge42_res_store  res_store_recharge42
router.post('/recharge42_res_store', recharge.res_store_recharge42);
// router.get('/timecheck', recharge.getRechargeByTime);
// router.get('/timecheck', recharge.getRechargeByTime);
// router.get('/timecheck', recharge.getRechargeByTime);
// router.get('/timecheck', recharge.getRechargeByTime);
// router.get('/timecheck', recharge.getRechargeByTime);
// router.get('/timecheck', recharge.getRechargeByTime);
// router.get('/success/:transID', recharge.getSslcommerzDataByTranID);

module.exports = router;
