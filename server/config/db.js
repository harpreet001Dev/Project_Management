// database connection 28-11 by amreek

const mongoose = require('mongoose');
require('dotenv').config();


const dbconnection =async()=>{
    try {
        const uri= process.env.MONGO_URI; //28-11 by amreek
        await mongoose.connect(uri);
        console.log("Connection to database is sucessfull!");
        
        
    } catch (error) {
        console.log("Connection error",error);
        
    }
}

module.exports = dbconnection;