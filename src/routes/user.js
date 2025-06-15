const express = require("express");
const userRouter = express.Router();

 const {userauth} = require("../middleware/auth");
 const ConnectionRequest = require("../models/connectionRequest");
 const User = require("../models/user");

 const USER_SAFE_data = "firstName lastName skills age about photoUrl";


 userRouter.get("/user/request/received",userauth,async(req,res)=>{

    try{
        const loggedinUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedinUser._id,
            status:"interested",
        }).populate("fromUserId",USER_SAFE_data);

        res.json({
            message:"data fetch succesfully",
            data:connectionRequest,
        });

    }
    catch(err){
        res.status(400).send("error : "+err.message);
    }

 });

 userRouter.get("/user/connections",userauth,async(req,res)=>{
        try{

            const loggedinUser = req.user;

            const connectionRequest = await ConnectionRequest.find({
                $or:[
                    {toUserId:loggedinUser._id,status:"accepted"},
                    {fromUserId:loggedinUser._id,status:"accepted"},
                ],
            }).populate("fromUserId",USER_SAFE_data).populate("toUserId",USER_SAFE_data);


            const data = connectionRequest.map((row)=>{
                if(row.fromUserId._id.toString() === loggedinUser._id.toString()){
                    return row.toUserId;
                }
                return row.fromUserId;
            });

            res.json({data});

        }
        catch(err){
            res.status(400).send("error :"+err.message);
        }
 });


 userRouter.get("/feed",userauth,async(req,res)=>{
    try{    
        const loggedinUser = req.user;

        const page = parseInt(req.query.page) || 1;

        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;

        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedinUser._id},
                {toUserId:loggedinUser._id}
            ],
        }).select("fromUserId toUserId");


        const hideUserFromFeed = new Set();

        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const user  = await User.find({
            $and:[
                {_id:{$nin : Array.from(hideUserFromFeed)}},
                {_id:{$ne : loggedinUser._id}},
            ],
        }).select(USER_SAFE_data).skip(skip).limit(limit);

        res.send({data:user});

    }catch(err){
        res.status(400).json({message:"error:"+err.message});
    }
 });


 module.exports = userRouter;