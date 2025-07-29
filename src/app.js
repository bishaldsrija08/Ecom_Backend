import express from 'express'
const app = express()

import cors from 'cors'

import envConfig from './config/envConfig.js';
envConfig()

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser'

import connectDb from './config/database.js';
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use('/api', productRoutes)
app.use('/api', authRoutes)



app.get("/", (req,res)=>{
    res.send("I am home page.")
})






// Server starting at port 3000
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Project successfully run at  port ${port}.`)
})