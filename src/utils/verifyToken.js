
import jwt from 'jsonwebtoken'

//Function to verify token
export const verifyToken = async (payload) => {
    try {
        return jwt.verify(payload, "secretKey")
    } catch (error) {
        console.log(error.message)
    }
}