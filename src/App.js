 const express = require("express");
 const connectDB = require("./config/database");
 const app = express();
 const User = require("./models/user");

 app.use(express.json());


 app.post("/signup",async(req,res)=>{
    //creating new instance of the user model
    
    const userdata = new User(req.body);

    try{
          await userdata.save();
        res.send("user added succesfully");
    }
    catch(err){
        res.status(400).send("error"+err.message);
    }

  

 })



 connectDB().then(()=>{
    console.log("db connection established");

    app.listen(7777, () => {
    console.log("server is started");
});
})
.catch(err=>{
    console.log("db cannot be connected");
});
 

