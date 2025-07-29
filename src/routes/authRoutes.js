import express from 'express';
import { forgotPassword, loginUser, registerUser, verifyOtp, resetPassword, restrictAuthPages } from '../controllers/authController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/verify-otp").post(verifyOtp)
router.route("/reset-password").post(resetPassword)

//verification
router.get("/verify/:step", restrictAuthPages);






export default router;