const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

// Middleware to read and parse the received JSON data
app.use(express.json());

app.post("/login", async (req,res) => {
    const {emailId,password} = req.body;
    try {
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (isPasswordValid) {
            res.send("Login Successfull..!!");
        } else {
            res.send("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})


app.post("/signup", async (req, res) => {
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

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    console.log(userEmail);
    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (error) {
        res.send("Something went wrong!");
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("Deleted a user successfully")
    } catch (error) {
        res.send("Something went wrong..!!");
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userid;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "userid", "firstName", "lastName", "password", "photoUrl"
        ];
        const updateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
        if (!updateAllowed) {
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        })
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("UPDATE FAILED: " + error.message);
    }
})

connectDB().then(() => {
    console.log("Connected to Database Successfully..");
    app.listen(3555, () => console.log("Server running at port: 3555..."));
}).catch(() => {
    console.log("Database connection failed...");
})


