 const express = require("express");
 const connectDB = require("./config/database");
 const app = express();
 
 const cookieparser = require("cookie-parser");
 


 app.use(express.json());
 app.use(cookieparser());


 const authRouter = require("./routes/auth");
 const profileRouter = require("./routes/profile");
 const requestRouter = require("./routes/request");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


 connectDB().then(()=>{
    console.log("db connection established");

    app.listen(7777, () => {
    console.log("server is started");
});
})
.catch(err=>{
    console.log("db cannot be connected");
});
 

