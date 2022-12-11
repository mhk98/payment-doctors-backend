const router = require('express').Router();
const lost_historytbls = require('../../controllers/lost-history.controller/lost-history.controller');

router.post('/', lost_historytbls.lost_historyInsert);
router.get('/unlockCard',lost_historytbls.getLostHistoryByCardId);
router.get('/chekcLost',lost_historytbls.getOnelostHistory);
module.exports = router;
