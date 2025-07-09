const { registerUser, loginUser, forgetPassword, verifyOtp, resetPassword } = require("../controller/auth/authController")

const router = require("express").Router()


//routes haru
router.route('/register').post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgetPassword)
router.route("/verifyotp").post(verifyOtp)
router.route("/resetpassword").post(resetPassword)

module.exports = router