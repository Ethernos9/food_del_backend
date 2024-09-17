import userModel from "../Models/userModel.js"

const addToCart = async (req, res) => {
    try {
       let userData = await userModel.findById(req.body.userId);
      //  console.log("userData ",userData);
       let cartData = await userData.cartData;
      //   console.log("cartData", cartData);
       if (!cartData[req.body.itemId]) {
          cartData[req.body.itemId] = 1;
       }
       else {
          cartData[req.body.itemId] += 1;
       }
      //  console.log("userData",userData);
       await userModel.findByIdAndUpdate(req.body.userId,{cartData});
       res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
       console.log(error);
       res.json({ success: false, message: "Error" })
    }
 }

 const removeFromCart = async (req,res)=>{
    try{
        const userData = await userModel.findById(req.body.userId)
      //   console.log("remove from cart : ",userData)
        const cartData =   await userData.cartData
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        return res.status(200).json({ success: true, message:"Item removed successfully"})
    }
     catch(error){
        console.log(error)
        res.json({success:false,message:"Error",error})
     }
 }
 const getFromCart = async (req,res)=>{
    try{
        const userData = await userModel.findById(req.body.userId)
      //   console.log("get from cart : ",userData)
        const cartData = await userData.cartData
        
        return res.status(200).json({success:true,cartData})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error",error})
 
    }
 }
export {
    addToCart,
    removeFromCart,
    getFromCart
}
