import{Schema} from "mongoose"


export const UsuarioSchema=new Schema({
    user:{
        type:String,
        required:true

    },
    password:{
    type:String,
    required:true   
    },
    email:{
        type:String,
        required:true   
        },
        date: { 
            type: Date, 
            default: Date.now 
        },
        role:{
            type:[String]
        }


})


