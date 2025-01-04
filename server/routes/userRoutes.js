const express = require("express");
const { register, login ,getUsers,AddProject} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get('/getusers',getUsers);
router.post('/addproject',AddProject);

module.exports = router;
