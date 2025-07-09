const { registerUser, loginUser, forgetPassword } = require("../controller/auth/authController")

const router = require("express").Router()


//routes haru
router.route('/register').post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgetPassword)

module.exports = router