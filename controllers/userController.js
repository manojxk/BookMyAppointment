const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
//get the users
const getAllUSers = async (req, res) => {
    try {
        const aptusers = await User.find();
        res.json(aptusers);
    } catch (err) {
        res.json({ message: err });
    }
}
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const newAptuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        type: "user",
    });
    if (req.body.password.length < 6) {
        return res.json({
            status: "error",
            error: "Password too small. Should be atleast 6 characters",
        });
    }
    try {
        const savedAptuser = await newAptuser.save();
        res.json(savedAptuser);
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: "error", error: "Username already in use" });
        }
    }
}
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email/password' })
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            // the username, password combination is successful
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            return res.json({
                status: 'ok',
                data: token,
                name: user.name,
                role: user.type,
                email: user.email
            })
        } else {
            res.json({ status: 'error', error: 'Invalid password' })
        }
    } catch (error) {
        res.json({ status: 'error', error: 'Invalid email/password' })
    }
}
// Generate JWT
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = {
    registerUser,
    loginUser,
    getAllUSers
}