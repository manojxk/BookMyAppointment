const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Active'],
            default: 'Pending'
        },
        confirmationCode: {
            type: String,
            unique: true
        },
    },

    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
