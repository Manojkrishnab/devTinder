const express = require('express');

const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');

// To get Profile details
profileRouter.get("/view", userAuth, async (req, res) => {
    const userProfile = req.user.toObject(); // converts Mongoose doc to plain object
    delete userProfile.password;

    try {
        res.send(userProfile);
    } catch (error) {
        res.send("Error: " + error.message);
    }
})

// To edit Profile details
profileRouter.patch('/edit', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Edit not allowed");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message: "Profile updated successfully",
            data: loggedInUser
        })

    } catch (error) {
        res.send("Error: " + error.message);
    }
})

// Implement PATCH Api for Update Password

module.exports = profileRouter;