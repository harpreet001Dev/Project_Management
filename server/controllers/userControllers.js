const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const secret_key = 'lksdflbsgdhfdlknl233';


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
    console.log("coming");

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