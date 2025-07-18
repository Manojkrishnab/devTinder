const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
}

const validateEditProfileData = (req) => {
    const allowedUpdates = ["firstName", "lastName", "photoUrl", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedUpdates.includes(field));

    return isEditAllowed;
}

module.exports = { validateSignUpData, validateEditProfileData }