const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouters = require('./routes/userRoutes');

const app =express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('dotenv').config(); //28-11 by amreek

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

const dbconnection =async()=>{
    try {
        const uri= process.env.MONGO_URI; //28-11 by amreek
        await mongoose.connect(uri);
        console.log("Connection to database is sucessfull!");
        
        
    } catch (error) {
        console.log("Connection error",error);
        
    }
}
dbconnection();


app.use("/api/users",userRouters);

app.listen(8000,()=>{
    console.log("server is running on 8000");
    
})