import express from "express"
import jwt from "jsonwebtoken"

const authMiddleware= (req,res,next)=>{
    const {token}= req.headers

 try {
    if (!token){
        return res.status(401).json({success:false,message:"Unauthorized"})
    }
    const token_deocde  =  jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId  = token_deocde.id
    next();

 } catch (error) {
    console.log(error)
    return res.status(403).json({success:false,message:"Invalid token"})
    
 }

}

export default authMiddleware;