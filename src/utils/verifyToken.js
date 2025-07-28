import jwt from 'jsonwebtoken'

//Function to verify token
export const verifyToken = async (payload) => {
    jwt.verify(payload, process.env.SECRET_KEY)
}