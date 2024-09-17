import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
const port = 3000
const app = express()
import dotenv from  "dotenv"
dotenv.config();

// middleware

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// connect to DB
import connectDB from "./dbConnection.js"
// connectDB("mongodb://127.0.0.1:27017/food_order")
connectDB("mongodb+srv://panseshubh999:ethernos9@fooddel.oleaf2k.mongodb.net/food-del")


// endpoint
import userRouter from "./Routes/userRoutes.js"
import foodRouter from "./Routes/foodRoutes.js"
import cartRouter from "./Routes/cartRoutes.js"
import orderRouter from "./Routes/orderRoutes.js"

app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})                   
