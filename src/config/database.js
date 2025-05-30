
const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://ankesxxh09:6Jd8ZlL7fhMkca4U@nodea99.guj4nhh.mongodb.net/Devtinder"
    );
};

module.exports = connectDB;


