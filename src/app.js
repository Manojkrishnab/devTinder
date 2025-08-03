const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');
require("dotenv").config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Middleware to read and parse the received JSON data
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

connectDB().then(() => {
    console.log("Connected to Database Successfully..");
    app.listen(process.env.PORT, () => console.log("Server running at port: 3555..."));
}).catch(() => {
    console.log("Database connection failed...");
})


