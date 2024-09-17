import express from "express"
import {loginUser,createUser} from "../Controller/userController.js"
const userRouter = express.Router()


userRouter.post("/login",loginUser)
userRouter.post("/sign-in",createUser)


export default userRouter 
