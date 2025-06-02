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

 app.get("/user",async(req,res)=>{
    const useremaill = req.body.emailID;

    try{
        const users = await User.find({emailID:useremaill});

        if(users.length === 0){
             res.status(400).send("something went wrong");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
 });

 app.get("/feed",async(req,res)=>{

    try{
        const users = await User.find({});

        if(users.length === 0){
             res.status(400).send("something went wrong");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
 });

  app.delete("/user",async(req,res)=>{
    const userid = req.body.userID;

    try{
        const users = await User.findByIdAndDelete(userid);

       res.send("deleted succesfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
 });

 app.patch("/user/:userID",async(req,res)=>{
    const userid = req.params?.userID;
    const data = req.body;
     try{
        const allowed_updates = ["photoUrl","about","skills","age"];
        const is_update = Object.keys(data).every((k)=>
        allowed_updates.includes(k));

        if(!is_update){
            throw new Error("update is not allowed");
        }
        if(data?.skills.length >10){
             throw new Error("more than 10 skills is not allowed");
        }
        const users = await User.findByIdAndUpdate({_id:userid},data,{
            returnDocument:"after",
            runValidators:true,
        });
        console.log(users);

       res.send("updated succesfully");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED"+err.message);
    }

 });



 connectDB().then(()=>{
    console.log("db connection established");

    app.listen(7777, () => {
    console.log("server is started");
});
})
.catch(err=>{
    console.log("db cannot be connected");
});
 

