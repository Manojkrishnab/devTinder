const express = require('express');
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const userRouter = express.Router();

// To get the List of Follow requests
userRouter.get("/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const data = await ConnectionRequest.find(
            {toUserId: loggedInUser._id, status: "interested"}
        ).populate("fromUserId", "firstName lastName");

        res.json({message: "Data fetched successfully", data});

    } catch (error) {
        res.status(500).send({message: "Unable to fetch requests " + error.message});
    }
})

// To get the List of Followers
userRouter.get("/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id, status: "accepted"},
                {toUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", "firstName lastName about")
        .populate("toUserId", "firstName lastName about");

        const data = connectionRequests.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
        })

        res.json({message: "Data fetched successfully", data});

    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
})

//To get Feed
userRouter.get("/feed", userAuth, async (req, res) => {
    
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = (limit>50)? 50 : limit;

        const skipValue = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(row => {
            hideUsersFromFeed.add(row.fromUserId.toString());
            hideUsersFromFeed.add(row.toUserId.toString());
        })

        const data = Array.from(hideUsersFromFeed);

        const users = await User.find({
            $and: [
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select("firstName lastName about").skip(skipValue).limit(limit);

        // localhost:3555/user/feed?page=2&limit=2     // localhost:3555/user/feed
        res.json({message: "Feed fetched successfully", users});

    } catch (error) {
        res.status(400).send({message: "Error: " + error.message})
    }

})

module.exports = userRouter;
