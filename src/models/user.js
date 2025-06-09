
const mongoose = require("mongoose");
const validator = require("validator");
 const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");

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
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("email is not valid"+value);
                }
            },
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
            },
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
            maxLength:10,

        },
    },
    {   
        timestamps:true,
    }
);

userschema.methods.getJWT = async function(){
    
    const user = this;

    
    const token = await jwt.sign({_id: user._id},"dev@tinder09",{expiresIn: "1d"});

    return token;

};

userschema.methods.validatePassword = async function(passwordInputByUser){
    
    const user = this;

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
}


module.exports = mongoose.model("User",userschema);