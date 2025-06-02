
const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
    {

        firstName:{
            type:String,
            required:true,
            minLength:4,
            maxLength:50,
        },
        lastName:{
            type: String,
        },
        emailID:{
            type: String,
            unique:true,
            lowercase:true,
            minLength:4,
            trim:true,
            maxLength:50,
        },
         password:{
            type:String,
            required:true,

        },
         age:{
            type:Number,
            min:18,
            max:100,
        },
         gender:{
            type: String,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("gender is not defined");    
                }
            }
        },
        photoUrl:{
            type:String,
        },
        about:{
            type:String,
            default:"this is about for user",
        },
        skills:{
            type:[String],

        },
    },
    {   
        timestamps:true,
    }
)


module.exports = mongoose.model("User",userschema);