const { createResponse } = require("../../utils/responseGenerator");
const db = require("../../models");
// const { async } = require("rxjs");

const User = db.user;
const sequelize = db.sequelize;
const Otp = db.otp;
// const otp = db.otp;


async function StoreOTP(otpData) {

    let current_time = new Date();
    // current_time.setUTCHours(6);
    let expire_time = new Date(current_time);
    expire_time = current_time.setMinutes(current_time.getMinutes() + 5);


    let dt_start = new Date(expire_time);
    dt_start = dt_start.toISOString().split(".")[0];
    let dt_staTransTime = dt_start.split("T")[0] + " " + dt_start.split("T")[1]; // 2022-02-01 21:17:11

    let create_instance = {
        Mobile_No: " ",
        otp: "",
        otpExpireTime: ""
    }
    // updating the create 
    create_instance.Mobile_No = otpData.Mobile_No;
    create_instance.otp = otpData.otp != null ? otpData.otp : "123456";
    create_instance.otpExpireTime = dt_staTransTime;
    // findone
    try {
        const result = await Otp.create(create_instance);
        // const [result, metadata] = await Otp.create(create_instance,{returning: true});

        // if result
        if (result) {
            return { "happy": true };

        }
    } catch (error) {
        return {"error":error};
    }

    // create opareting
    return { "happy": false };
}


//is there is any user of the given number

async function isThisUser(otpData) {

    try {
        const result = await User.findOne({
            where: { Mobile_No: otpData.Mobile_No },
            // order: [["createdAt", "DESC"]]
        });

        if (result) {
            //  (result.toJSON().Mobile_No);
            return { "user": true }
        }
        else {
            return { "user": false }
        }
    } catch (error) {
        res.json(createResponse({ "status": "db error" }, "db error", true));
    }
}



// Function to generate OTP
module.exports.generateOTP = async (req, res, next) => {
    //module exports OTP{
    try {
        {
            let isUser = await isThisUser(req.body);

            // Declare a string variable
            // which stores all string
            let sotre_otp;
            if (isUser.user) {
                sotre_otp = await StoreOTP(req.body);
            } else {
                res.json(createResponse({ "status": "given number is not valid" }));
            }


            // Find the length of string
            // wait for OTP service to get the otp
            res.json(createResponse(sotre_otp));

        }
    } catch (error) {
        next(error.message);
        return {"error":error.message};
    }
}


//sign up otp
// Function to generate OTP
module.exports.generateOTPsignup = async (req, res, next) => {
    //module exports OTP{
    try {
        {

            // Declare a string variable
            // which stores all string
            let sotre_otp = await StoreOTP(req.body);
            // Find the length of string
            // wait for OTP service to get the otp
            res.json(createResponse(sotre_otp));

        }
    } catch (error) {
        next(error.message)
    }
}

//checking if the OTP is valid then check if the valid time is ok

async function validateOTP(otpData) {

    try {
        (otpData.Mobile_No);
        const result = await Otp.findOne({
            where: { Mobile_No: otpData.Mobile_No },
            order: [["createdAt", "DESC"]]
        });

        if (result) {
            let optdataTime = new Date(otpData.time);
            let dbtime = result.toJSON().otpExpireTime;
            dbtime = dbtime.setHours(dbtime.getHours() + 6);

            var isLarger = new Date(dbtime) > new Date(optdataTime);

            if (result.toJSON().otp == otpData.otp && isLarger) {
                return { "otp_status": "accept OTP" }
            } else {
                if (isLarger) {
                    return { "otp_status": " wrong OTP" }

                } else {
                    return { "otp_status": "expired OTP" }
                }
            }
        } else {
            return { "otp_status": "not found mobile number" }
        }

    } catch (error) {
        next(error.message);
        return {"error":error.message};

    }
    return { "happy": true };
}



// Function to generate OTP
module.exports.CheckOTP = async (req, res, next) => {
    //module exports OTP{
try {
        // Declare a string variable
        // which stores all string
        let val_otp = await validateOTP(req.body);

        res.json(createResponse(val_otp));
    } catch (error) {
        next(error.message)
    }
}



