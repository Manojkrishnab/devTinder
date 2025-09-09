const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,  // to store the received data in Lowercase
            trim: true        // to remove the empty spaces in the received data
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is Invalid")
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
        },
        about: {
            type: String,
            default: "This is default About of the User"
        },
        skills: {
            type: [String]  // an array of strings
        }
    },
    {
        timestamps: true    // it automatically adds createdAt, updatedAt properties to data (an utility provided by Mongoose)
    }
)

userSchema.methods.getJWT = function () {
    const user = this;   // Here this refers to that Particular instance (User)

    const token = jwt.sign({_id: user._id}, "DevTinder@gh56$hj7", {
        expiresIn: "1h",
    })
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const hashedPassword = user.password;
    
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword);

    return isPasswordValid;
}

// const userModel = mongoose.model("User", userSchema);   // customName, Schema

module.exports = mongoose.model("User", userSchema);