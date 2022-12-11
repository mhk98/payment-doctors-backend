const router = require('express').Router();
const sslCommerz = require('../../controllers/sslCommerz/sslCommerz.controller');

router.post('/ssl-request', sslCommerz.sslrequestInsert);
router.post('/ssl-payment-success', sslCommerz.sslpaymentsuccessInsert);
router.post(
  '/ssl-payment-notification',
  sslCommerz.sslpaymentnotifiactionInsert,
);
router.post('/ssl-payment-fail', sslCommerz.sslpaymentfailInsert);
router.post('/ssl-payment-cancel', sslCommerz.sslpaymentcancelInsert);
router.post('/ssl-payment-refund', sslCommerz.sslcommerzRefundInsert);
// router.get('/ssl-success-data', sslCommerz.sslsuccessdata);
router.get('/ssl-success-data/:transactionId/:cardNo', sslCommerz.paymentsuccess);
router.get('/ssl-fail-data/:transactionId', sslCommerz.paymentfail);
router.get('/alltransaction/:card_number', sslCommerz.allTransaction);

module.exports = router;
