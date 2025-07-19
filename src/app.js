import express from 'express'
const app = express()

import dotenv  from 'dotenv'
dotenv.config()

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

import connectDb from './config/database.js';
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


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