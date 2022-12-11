const router = require("express").Router();
const userController = require("../controllers/user/users.controller");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/resetPassword", userController.resetPassword);
//  router.post("/checkregister/", User.getregister);

module.exports = router;
