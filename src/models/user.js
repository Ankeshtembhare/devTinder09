
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({

        firstName:{
            type:String,
        },
        lastName:{
            type: String,
        },
        emailID:{
            type: String,
        },
         password:{
            type:String,
        },
         age:{
            type:Number,
        },
         gender:{
            type: String,
        },

})


module.exports = mongoose.model("User",userschema);