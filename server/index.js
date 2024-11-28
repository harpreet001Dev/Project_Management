const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouters = require('./routes/userRoutes');
const dbconnection = require('./config/db'); //connection required

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

//database connection
dbconnection();


app.use("/api/users",userRouters);

app.listen(8000,()=>{
    console.log("server is running on 8000");
    
})