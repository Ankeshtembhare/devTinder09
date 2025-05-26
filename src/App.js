
const express = require("express");


const app = express();

//reuest handlestrsa


app.get("/",(req, res)=>{

    res.send("main  page");

});


app.get("/hello",(req,res)=>{

    res.send("hello page");

});


app.get("/test",(req,res)=>{

    res.send("test page");

});



app.listen(7777,()=>{
    console.log("server is started ");
});