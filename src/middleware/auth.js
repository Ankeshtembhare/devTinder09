const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userauth = async(req,res,next)=>{
    //read the token from the req cookies
   try{ 
    const {token} = req.cookies;

    if(!token){
        throw new Error("token is not valid>>>>>>>>"); 
    }
    //validate the token

      const decoded_msg = await jwt.verify(token,"dev@tinder09");

        const {_id} = decoded_msg;

        

          //find the user 
        const user = await User.findById(_id);
        if(!user){
            throw new error("user not found");
        }

        req.user = user;
        next();

    }
    catch(err){
        res.status(400).send("error:"+err.message);
    }


  

   
};



module.exports = {
    userauth
};