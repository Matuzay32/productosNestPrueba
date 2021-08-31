import { Schema } from "mongoose";

export const ProductosSchema = new Schema({
    name:{
        type:String, 
        require :true
    },
    price:{
        type:Number, 
        required: true
    },
    description:{
            type:String,
            require :true
        },
    imageUrl:
    {
        type:String, 
        require :true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})