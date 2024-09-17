import userModel from "../Models/userModel.js";
import orderModel from "../Models/orderModel.js";
import dotenv from "dotenv"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
dotenv.config();

// console.log(process.env.STRIPE_SECRET_KEY)
const frontend_URL = 'http://localhost:5173';


const currency = "inr";
const deliveryCharge = 30;



const placeOrder = async (req, res) => {
    //    console.log("req.body",req.body)
        try {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address,
            })
            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    
            const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 
                },
                quantity: item.quantity
            }))
    
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: "Delivery Charge"
                    },
                    unit_amount: deliveryCharge * 100
                },
                quantity: 1
            })
            //  console.log("line_items: " , line_items)
             
            const session = await stripe.checkout.sessions.create({
                success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
                line_items: line_items,
                mode: 'payment',
            });
            
    
            // console.log("session : ", session)
    
            res.json({ success: true, session_url: session.url });
    
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" })
        }
    }
    
    

    const placeOrderCod = async (req, res) => {

        try {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address,
                payment: true,
            })
            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    
            res.json({ success: true, message: "Order Placed" });
    
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" })
        }
    }
    // Listing Order for Admin panel
    const listOrders = async (req, res) => {
        try {
            const orders = await orderModel.find({});
            res.json({ success: true, data: orders })
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" })
        }
    }
// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    // console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    // console.log(req.body);
    try {
        if (success === "true") {
           const response =  await orderModel.findByIdAndUpdate(orderId,{ payment: true });
           console.log(response.payment);
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}



export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod }