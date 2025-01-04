const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Project = require('../models/ProjectModel');

//dotenv file included 28-11-24
require('dotenv').config();

const secret_key =process.env.secret_key;


const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    role: Joi.string(),
});

const createToken = (id) => {
    return jwt.sign({ id }, secret_key, { expiresIn: "1d" });
}


exports.register = async (req, res) => {

    const { error, value } = userSchema.validate(req.body);
    if (error) {
        console.log("Validation error:", error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password, role } = req.body;
    const userExit = await User.findOne({ email });


    if (userExit) {
        res.status(400).json({ message: "User already exist!" });
    }
    const newuser = await User.create({ name, email, password, role });
    const token = createToken(newuser._id);
    res.cookie("token", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000, domain: "localhost" });
    console.log("user created sucessfully!");

    res.status(201).json(newuser);
}

const LoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).unknown();  // Allows any additional properties (like "name")



exports.login = async (req, res) => {
    const { error, value } = LoginSchema.validate(req.body);
    if (error) {
        console.log("Validation error:", error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const findUser = await User.findOne({ email });
        console.log(findUser, "user");

        if (!findUser) { res.status(400).json({ message: "Invalid logins!" }) };
        const isMatch = await findUser.comparePassword(password);
        console.log(isMatch, "isMatch");

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = createToken(findUser._id);
        res.cookie("token", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
        console.log("Logged in!");

        res.status(200).json({ id: findUser._id, role: findUser.role });

    } catch (error) {
        res.status(400).json({ message: "Login failed!" })
    }
}

// Getting users except admin 
exports.getUsers=async(req,res)=>{    
    try {
        const users = await User.find({role:{$ne:'admin'}}).select('name');
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
    
}



const projectSchema = Joi.object({
  project: Joi.string().required(),
  owner: Joi.string().required(),
  startdate: Joi.date().required(),
  enddate: Joi.date().required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').required(),
  description: Joi.string().required(),
  members: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
  })).required()
});

exports.AddProject = async (req, res) => {
  // Validate the incoming request body
  const { error } = projectSchema.validate(req.body);

  if (error) {    
    return res.status(400).json({ message: error.details[0].message });
  }


  // Destructure the required fields from the validated body
  const { project, owner, startdate, enddate, priority, description, members } = req.body;

  try {
    // Create a new project using the validated data
    const newProject = new Project({
      project,
      owner,
      startdate,  // Ensure this is a valid Date type
      enddate,    // Ensure this is a valid Date type
      priority,
      description,
      members
    });


    // Save the new project to the database
    await newProject.save();
    console.log("new project is created");
    const io = req.app.get('socketio');
    members.forEach((member) => {
      io.to(member._id).emit('task-created', {
        message: `A new project "${project}" has been assigned to you.`,
        projectId: newProject._id,
      });
    });

    // Respond with success
    res.status(201).json({ message: "Project added successfully", project: newProject });

  } catch (error) {
    // Handle any errors during project creation
    console.error("Error creating project:", error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

