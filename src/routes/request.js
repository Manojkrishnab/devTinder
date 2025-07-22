const express = require('express');
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid Status Type: " + status
            })
        }

        // check User exists in database (or) not
        const toUser = await User.findOne({ _id: toUserId });
        if (!toUser) {
            return res.status(404).send({message: "User not found.."});
        }

        // check, if connection request already exists
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).send({message: "Connection request already exists"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })

        // Check if the fromUserId is same as toUserId  =>  Refer 'Schema validation'
        const data = await connectionRequest.save();

        res.json({
            message: "Request sent successfully",
            data
        })
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
})

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Status not allowed.!"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if (!connectionRequest) {
            return res.status(404).json({message: "Connection request not found"});
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({message: "Connection request: " + status, data});
        
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = requestRouter;