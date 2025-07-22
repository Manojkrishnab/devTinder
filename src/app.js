const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

// Middleware to read and parse the received JSON data
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

connectDB().then(() => {
    console.log("Connected to Database Successfully..");
    app.listen(3555, () => console.log("Server running at port: 3555..."));
}).catch(() => {
    console.log("Database connection failed...");
})


