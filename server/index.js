const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouters = require('./routes/userRoutes');
const dbconnection = require('./config/db'); //connection required
const http=require('http');
const {Server, Socket} = require('socket.io');




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

const server = http.createServer(app);




const io = new Server(server,{
    cors: {
        origin: '*', // Allow connections from all origins (update as needed)
      },
});

app.set('socketio', io);
io.on('connection',(Socket)=>{
    console.log("connection id",Socket.id);

   Socket.on('join-room',(userId)=>{
    console.log(`User ${userId} joined their room`);
    Socket.join(userId);
    
   })

    Socket.on('disconnect',()=>{
        console.log("user disconnected",Socket.id);
        
    })
})





app.use("/api/users",userRouters);

server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});