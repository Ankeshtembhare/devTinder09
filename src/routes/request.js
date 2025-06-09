const express = require("express");
const requestRouter = express.Router();

 const {userauth} = require("../middleware/auth");


requestRouter.post("/sendRequest",userauth,async(req,res)=>{

    const user = req.user;

    res.send(user.firstName + "  sent you a connection  request");
    
 });


 module.exports = requestRouter;