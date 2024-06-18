const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false, require: true },
        address: { type: String },
        phone: { type: Number },
        access_token: { type: String },
        refresh_token: { type: String }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;