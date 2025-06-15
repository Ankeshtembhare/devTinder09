const express = require("express");
const requestRouter = express.Router();

 const {userauth} = require("../middleware/auth");
 const ConnectionRequest = require("../models/connectionRequest");
 const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",
    userauth,
    async(req,res)=>{

    try{

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    //checking for status only ignored and interested is allowed

    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"invalid status type!!"+status});
    }
    //if user try to send request to itself
   /* if(fromUserId === toUserId){
         return res.status(400).json({message:"you cannot send a reuqst to yourself"});
    }*/

      //checking for the user present in db or not basically checking the id of toUser

    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message:"user not found"});
    }
    //checking if a connection request is already present and if a => b and b =>a 
    const exisitingConnection =   await ConnectionRequest.findOne({
        $or :[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
        ],
    });

    if(exisitingConnection){
        return res.status(400).send({message:"connection request already exisist"});
    }

  



    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    });

    const data = await connectionRequest.save();

    res.json({
        message:req.user.firstName + " is " + status + " to your profile, "+ toUser.firstName,
        data
    });


    }
    catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }

 
    
 });

requestRouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
try{
     const loggedInUser = req.user;
    const {status,requestId} = req.params;

    //validate the status is only accepted and rejected
    const allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes((status))){
        return res.status(400).json({message:"invalid status type"+status});
    }

    //checking the touserid=is loggedin user , requestid is on db  and status is interesed

    const connectionRequest = await ConnectionRequest.findOne({
          _id :requestId,  
        toUserId:loggedInUser._id,
        status:"interested",
      
    });

    if(!connectionRequest){
        return res.status(404).json({message:"connecnction request not found"});
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({message:"connection request is "+ status,data});
}
catch(err){
    res.status(400).send("error:"+err.message);
}
   
});


 module.exports = requestRouter;