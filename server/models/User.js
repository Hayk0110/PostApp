const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = model("User", UserSchema);