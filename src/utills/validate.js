const validator = require("validator")

const validateSignupData = (req)=>{

    const {firstName,lastName,emailID,password} = req.body;


    if(!firstName || !lastName ){
        throw new Error("please enter the firstname");
    }
    else if(!validator.isEmail(emailID)){
        throw new Error("email is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }

};

module.exports ={
    validateSignupData,
};