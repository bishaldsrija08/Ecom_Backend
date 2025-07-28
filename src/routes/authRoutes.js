import express from 'express';
import { forgotPassword, loginUser, registerUser, verifyOtp, resetPassword } from '../controllers/authController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/verify-otp").post(verifyOtp)
router.route("/reset-password").post(resetPassword)

//verification
router.get("/verify/:step", async (req, res) => {
    const { step } = req.params
    const token = req.cookies.authToken
    try {
        if (step === "home") {
            if (!token) {
                res.status(400).json({
                    message: "Please login to procede."
                })
            }
            const isValid = verifyToken(token)
            if (!isValid) {
                res.status(400).json({
                    message: "Token expired"
                })
            }
        }
        if (step === "verify-otp") {

        }
        return res.status(200).json({
            message: "Verification successful"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
})





export default router;