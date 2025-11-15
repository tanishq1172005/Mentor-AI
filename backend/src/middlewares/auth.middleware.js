import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { apiError } from '../utils/apiError.js';

export const protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)
            next()
        }catch(err){
            console.error(err)
            throw new apiError(401,"Not authorized, token failed")
        }
    }
}

export const isAdmin = async(req,res,next)=>{
    if(req.user && req.user.role === "Admin"){
        next()
    }else{
        throw new apiError(403,"Not authorized")
    }
}