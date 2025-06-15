
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values: ["ignored","accepted","rejected","interested"],
            message:`{VALUE} is incorrect status type`,
        }
    },
},
{timestamps:true,}
);

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new error("you cannot send a request to yourself");
    }
    next();
});


connectionRequestSchema.index({fromUserId:1,toUserId:1});


const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel",connectionRequestSchema);

module.exports = ConnectionRequestModel;