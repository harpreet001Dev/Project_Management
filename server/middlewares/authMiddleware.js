const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const secret_key ='lksdflbsgdhfdlknl233';



exports.ProtectedRoute=async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){return res.status(401).json({message:"Not authorized!"})}
    try {
        const decoded = jwt.verify(token,secret_key);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token!"})
    }
}

exports.checkAdmin=async(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next();
    }
    res.status(403).json({ message: "Not authorized as admin" });
}