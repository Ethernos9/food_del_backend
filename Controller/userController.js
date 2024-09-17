import express from "express"
import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import validator from 'validator';
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();




const loginUser = async(req,res)=>{
    const {email,password}= req.body;

   try {
      const user = await userModel.findOne({email})

      if (!user){
        return res.status(400).json({success:false,msg:"User doesn't exist "})
    }

//Validate the Password
    const ismatch = await bcrypt.compare(password,user.password)
    if (!ismatch){
        return res.status(400).json({success:false,msg:"Invalid credentials"})
    }

// Generate JWT Token
    const token = createToken(user._id)
    if (token){
        return res.status(200).json({success:true,token})
    }
    else{
        return res.status(400).json({success:false,msg:"Failed to create token"})
    }

       
   } catch (error) {
          console.log(error)
          throw new Error(error)
   }
    


}

const createToken = (id)=>{
   
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// Create a new user in DB

const createUser = async(req,res)=>{

    const {name,email,password} = req.body;
 
    try{
     
 // Check if the user already exists in the database.
       
        const entry =  await userModel.findOne({email})
       if (entry){
        return res.status(400).json({success:false,msg:"User already exists"})
       }

// Hash the password before saving it to the database.
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

// Validate user email and password
    if (!validator.isEmail(email)){
        return res.status(400).json({success:false,msg:"Invalid email format"})
    }
    if (password.length < 8){
        return res.status(400).json({success:false,msg:"Password should be at least 8 characters long"})
    }
 

 // Create a new user in the database.
 
    const newUser = await userModel.create ({
        name,
        email,
        password : hashedPassword,
    })
    await newUser.save();
    if (newUser){
        const token = createToken(newUser._id)
        if (token){
            return res.json({success:true,token})
        }
        else{
            return res.status(400).json({success:false,msg:"Failed to create token"})
        }
       
       
    }
    return res.status(400).json({success:false,msg:"Failed to create user"})


    }
    catch(error){
        console.log(error)
        throw new Error (error)
    }

    

}

export  {
  loginUser,
  createUser
};
