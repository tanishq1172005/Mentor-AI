import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    framework:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    sourceUrl:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Docs = mongoose.model("Docs",docSchema)