import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {apiError} from '../utils/apiError.js'

const generateToken =(userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
}

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password} =req.body;
        if(!name || !email || !password){
            throw new apiError(400,"Please fill out all fields")
        }
        const userExists = await User.findOne({email})
        if(userExists){
            throw new apiError(400,"User already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
        res.send(token)
    }catch(err){
        res.status(500).json({message:"Server Error",err:err.message})
    }
}

export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            throw new apiError(400,"Please fill out all fields")
        }
        const user = await User.findOne({email})
        if(!user){
            throw new apiError(400,"User does not exists")
        }
        const isCompare = await bcrypt.compare(password,user.password)
        if(!isCompare){
            throw new apiError(400,"Invalid email or password")
        }
        
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }catch(err){
        res.status(500).json({message:"Server Error",err:err.message})
    }
}

export const getUser = async(req,res)=>{
    const user = req.user;
    res.status(200).json({user})
}