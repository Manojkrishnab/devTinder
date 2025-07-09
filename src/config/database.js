const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://manojkrishna:Fr47YyOBXUlxKv8t@namastenodejs.lvcmdyi.mongodb.net/devTinder"
    )
};

module.exports = connectDB;