 const express = require("express");
 const connectDB = require("./config/database");
 const app = express();
 
 const cookieparser = require("cookie-parser");
 const cors = require("cors");
 

 app.use(cors({
    origin:"http://localhost:5173/login",
    credentials:true,
 }));
 app.use(express.json());
 app.use(cookieparser());


 const authRouter = require("./routes/auth");
 const profileRouter = require("./routes/profile");
 const requestRouter = require("./routes/request");
 const userRouter  = require("./routes/user");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


 connectDB().then(()=>{
    console.log("db connection established");

    app.listen(7777, () => {
    console.log("server is started");
});
})
.catch(err=>{
    console.log("db cannot be connected");
});
 

