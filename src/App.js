 const express = require("express");
const app = express();

app.get("/user", (req, res) => {
    res.send({firstname:"ankesh" , lastname:"tem"});
});

app.post("/user",(req,res)=>{
    res.send("post the user info ");
});


app.delete("/user",(req,res)=>{
    res.send("delete the user info");
});


app.patch("/user",(req,res)=>{
    res.send("post the user info ");
});


app.use("/hello", (req, res) => {
    res.send("hello page");
});

app.use("/test", (req, res) => {
    res.send("test page");
});

app.use("/", (req, res) => {
    res.send("main page page");
});

app.listen(7777, () => {
    console.log("server is started");
});
