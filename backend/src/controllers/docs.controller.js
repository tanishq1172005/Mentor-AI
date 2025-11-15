
import { Docs } from "../models/docs.model.js";
import { apiError } from "../utils/apiError.js";


export const addDocs = async(req,res)=>{
        try{
            const {framework,topic,content,sourceUrl} = req.body;
            if(!framework || !topic || !content || !sourceUrl){
                throw new apiError(400,"Please fill out all fields")
            }
            const docs = await Docs.create({
                framework,
                topic,
                content,
                sourceUrl
            })
            res.status(200).json({docs})
        }catch(err){
            res.status(500).json({message:"Server Error",err:err.message})
        }
}

export const allDocs = async(req,res)=>{
    const docs = await Docs.find()
    res.status(200).json({docs})
}