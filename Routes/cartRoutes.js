import express from "express";
import authMiddleware from "../Middleware/auth.Middleware.js";
const cartRouter = express.Router()


import { addToCart,removeFromCart,getFromCart} from "../Controller/cartController.js";

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getFromCart)


export default cartRouter;