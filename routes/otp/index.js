const router = require('express').Router();
const otp = require('../../controllers/OTPcontroller/OTP.controller');

router.post('/', );
router.post('/CheckOTP',otp.CheckOTP);
router.post('/generateOTP',otp.generateOTP );
router.post('/signupOTP',otp.generateOTPsignup );
//generateOTPsignup
module.exports = router;
