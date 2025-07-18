
//Register user

import User from "../models/UserModel.js"

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
                password
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


export { registerUser }