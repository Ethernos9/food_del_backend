import express from "express"
import { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod } from '../Controller/orderController.js';
import stripeMiddleware from "../Middleware/stripeMiddleware.js";


const orderRouter = express.Router()


orderRouter.post("/place",stripeMiddleware,placeOrder)
orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",stripeMiddleware,userOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/placecod",stripeMiddleware,placeOrderCod);


export default orderRouter