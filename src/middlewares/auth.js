const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not valid..!!");
        }

        const decodedObj = await jwt.verify(token, "DevTinder@gh56$hj7");
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