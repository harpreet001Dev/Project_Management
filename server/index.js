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

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

const dbconnection =async()=>{
    try {
        const uri='mongodb+srv://harpreet13108159:Harpreet%409016@cluster0.ckrpr.mongodb.net/newdb';;
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