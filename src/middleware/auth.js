
const adminauth = (req,res,next)=>{
    const token = "xyz";
    const isadmin = token === "xyz";
    if(!isadmin){
        res.status(401).send("unauthorized user");
    }
    else{
        next();
    }
};

const userauth = (req,res,next)=>{
    const token = "xyz";
    const isuser = token === "xyz";
    if(!isuser){
        res.status(401).send("unauthorized user");
    }
    else{
        next();
    }
};



module.exports = {
    adminauth,userauth
};