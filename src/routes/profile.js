const express = require("express");
const profileRouter = express.Router();

 const {userauth} = require("../middleware/auth");
 const {validateEditFields} = require("../utills/validate");
 const User = require("../models/user");
 const bcrypt = require("bcrypt");

 profileRouter.get("/profile/view",userauth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);

    }
     catch(err){
        res.status(400).send("error:"+err.message);
    }
    
    
 });

 profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
        if(!validateEditFields(req)){
            throw new error("invalid edit request");
        }

        const loggedInUser = req.user;
         
        Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]));

       await loggedInUser.save();

        res.json({message:`${loggedInUser.firstName} , your profile updated succesfully`,data:loggedInUser});
    }
    catch(err){
         res.status(400).send("error:"+err.message);
    }
    }
 );

 profileRouter.patch("/profile/updatepassword",userauth,async(req,res)=>{

  const { emailID, oldPassword, newPassword } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ emailID });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }


 });

 module.exports = profileRouter;