const express = require('express');
const User = require('../models/user');
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// For Login
authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(401).json({ message: "Invalid Login Credentials" });
        }

        const isPasswordValid = await user.validatePassword(password);  // schema method
        if (isPasswordValid) {
            const accessToken = user.getJWT();
            res.cookie("token", accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000    // 1 hour in milliseconds
            })
                .json({ message: "Login Success..!!", data: user });
        } else {
            return res.status(401).json({ message: "Invalid Login Credentials" });
        }

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

// For Signup
authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // creating a new instance of 'User' model
        const user = new User({
            firstName, lastName, emailId,
            password: hashedPassword
        });
        const savedUser = await user.save();  // to insert data into database
        const accessToken = savedUser.getJWT();
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000    // 1 hour in milliseconds
        })
        res.json({ message: "User Added Successfully", data: savedUser });
    } catch (err) {
        res.status(400).send("Error adding a user: " + err.message);
    }
})

// For Logout
authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout Successfull..!!");
})

module.exports = authRouter;