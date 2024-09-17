import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({

       userId : {type :String,required:true},
       items :  {type :Array,required:true},
       address : {type :Object,required:true},
       amount:  {type :Number,require:true},
       date:    {type:Date,default:Date.now()},
       status:  {type :String,default:"Food Processing"},
       payment: {type :Boolean, default:false}



},{timestamps:true})

const orderModel = mongoose.model("Order",orderSchema);

export default orderModel;