const express = require("express");
const authRouter = express.Router();

 const {validateSignupData} = require("../utills/validate");
 const bcrypt = require("bcrypt");
 const User = require("../models/user");
 const validator = require("validator");

 authRouter.post("/signup",async(req,res)=>{

try{
    //first validate all the data that is coming from req
    validateSignupData(req);

    const {firstName,lastName,emailID,password} = req.body;
    //encrypting password
    const passwordHash = await bcrypt.hash(password,10);
    //creating new instance of the user model

    const userdata = new User({
        firstName,
        lastName,
        emailID,
        password:passwordHash,
    });

    
          await userdata.save();
        res.send("user added succesfully");
    }
    catch(err){
        res.status(400).send("error:"+err.message);
    }

 });


authRouter.post("/login",async(req,res)=>{
    try{
        const {emailID,password} = req.body;

        //safety check for eamil
        
        if(!validator.isEmail(emailID)){
                throw new Error("Invalid credentials");
            }
        
        const user = await User.findOne({emailID:emailID});
        if(!user){
            throw new Error("invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token = await user.getJWT();

            res.cookie("token",token,{
                expires: new Date(Date.now()+8*3600000),
            }); 

            res.send("login succesfull!!");
        }
        else{
            throw new Error("invalid credentials");
        }


    }
    catch(err){
        res.status(400).send("error:"+err.message);
    }
 });

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,
        {expires:new Date(Date.now()),

        });

    res.send("logout succesfull!!!!!");

});

module.exports = authRouter;