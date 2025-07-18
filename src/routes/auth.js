const express = require('express');
const User = require('../models/user');
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/login", async (req,res) => {
    const {emailId,password} = req.body;
    try {
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);  // schema method
        if (isPasswordValid) {
            const accessToken = user.getJWT();
            res.cookie("token", accessToken)
            .send("Login Successfull..!!");
        } else {
            res.send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            firstName, lastName, emailId, 
            password: hashedPassword
        });
        await user.save();  // to insert data into database
        res.send("User Added Successfully...!!!");
    } catch (err) {
        res.status(400).send("Error adding a user: " + err.message);
    }
})

authRouter.post("/logout", (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout Successfull..!!");
})

module.exports = authRouter;