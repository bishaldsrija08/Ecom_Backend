
//Register user
import jwt from 'jsonwebtoken'
import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import generateOTP from '../services/generateOpt.js'
import Otp from '../models/OtpModel.js'

const registerUser = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body
    try {
        if (!userName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "Please provide all fields."
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password should be same."
            })
        }
        // if (password.length < 8) {
        //     return res.status(400).json({
        //         message: "Password must be greater that 8."
        //     })
        // }
        const data = await User.find({ email: email })
        if (data.length === 0) {
            await User.create({
                userName,
                email,
                password: await bcrypt.hashSync(password, 10)
            })
            return res.status(200).json({
                message: "User registered successfully!s"
            })
        }
        res.status(400).json({
            message: "User already exists with that email."
        })
    } catch (error) {
        res.status(400).json({
            message: error.messages
        })
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email: email })
        if (!userExist) {
            return res.status(400).json({
                message: "Invalid user."
            })
        }

        const isMatched = bcrypt.compareSync(password, userExist.password)

        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid password."
            })
        }

        //Data to be hide
        const payload = {
            email: userExist.email,
            id: userExist._id,
            role: userExist.role,
            userName: userExist.userName
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.cookie('authToken', token)
        res.status(200).json({
            message: "User loggedIn successfully.",
            token
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Forgot password - Send otp

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            res.status(400).json({
                message: "Must provide email to continue."
            })
        }
        const doesUserExist = await User.findOne({ email })
        if (!doesUserExist) {
            res.status(400).json({
                message: "User doesn't exists."
            })
        }
        // it meanse user xa

        const otp = generateOTP()
        const data = await Otp.create({
            email,
            otp
        })
        res.status(200).json({
            message: "otp sent successfully",
            data
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body
        if (!otp || !email) {
            return res.status(400).json({
                message: "Please provide OTP and email."
            })
        }

        const doesUserMatch = await User.findOne({ email: email })
        if (!doesUserMatch) {
            res.status(400).json({
                message: "User is not registerd!"
            })
        }

        const doesHaveOtp = await Otp.findOne({ email })
        if (!doesHaveOtp) {
            return res.status(400).json({
                message: "OTP is expired! Please try again!"
            })
        }

        if (otp !== doesHaveOtp.otp) {
            return res.status(200).json({
                message: "Invalis OTP!"
            })
        }
        res.status(200).json({
            message: "OTP is verified!",
            data: doesHaveOtp
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                message: "User email and password are madetory to input."
            })
        }

        const doesUserMatch = await User.findOne({ email: email })
        if (!doesUserMatch) {
            res.status(400).json({
                message: "User is not registerd!"
            })
        }
        await User.findOneAndUpdate({ email }, {
            password: await bcrypt.hashSync(password, 10)
        }, { new: true })

        res.status(200).json({
            message: "Your password is reset, Please login!"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword }