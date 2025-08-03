const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Please Login");
        }

        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObj;

        const userDetails = await User.findById(_id);
        if (!userDetails) {
            throw new Error("User details not found!");
        }
        req.user = userDetails;
        next();
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

module.exports = { userAuth }