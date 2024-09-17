import jwt from 'jsonwebtoken';

const stripeMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        // console.log("token_decode",token_decode)
        
        req.body.userId = token_decode.id;
        req.headers['Authorization'] = `Bearer ${process.env.STRIPE_SECRET_KEY}`;
        // console.log("req.headers",req.headers)
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default stripeMiddleware;
