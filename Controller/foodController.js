import foodModel from "../Models/foodModel.js"
import fs from "fs"


const addFood = async(req,res)=>{
   
    const {name,description,price,category}= req.body
    try {
        const food = await foodModel.create({
            name,
            description,
            price,
            category,
            image:req.file.filename
        })
        await food.save()
        if (!food){
            return res.status(404).json({success:false,message:"Unable to add foodItem"})
        }
        res.status(201).json({success:true,message:"Food item added successfully",food})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Unable to add foodItem",error})

    }

}
const listFood = async(req,res)=>{
     try {
          const allFoodItems = await foodModel.find({})
          if (!allFoodItems){
            return res.status(404).json({success:false,message:"Unable to fetch foodItems"})
          }
         
          return res.status(200).json({success:true,data:allFoodItems})
     } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Unable to fetch food items",error})
     }
}
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export {
    addFood,
    listFood,
    removeFood,
 
}