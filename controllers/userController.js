const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
const config = require('../config/auth.config.js');
const { sendMail } = require("../config/nodemailer.config");
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
    const token = jwt.sign({ email: req.body.email }, config.secret);
    const newAptuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        type: "user",
        confirmationCode: token,
    });
    try {
        const user = await newAptuser.save();
        sendMail(user.name, user.email, user.confirmationCode, 'users')
        res.json(user);
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
            return res.json(user)
        } else {
            res.json({ status: 'error', error: 'Invalid password' })
        }
    } catch (error) {
        res.json({ status: 'error', error: 'Invalid email/password' })
    }
}
const verifyUser = async (req, res) => {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((user) => {
            console.log(user);
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            user.status = "Active";
            user.save(function (err) {
                // error occur
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                // account successfully verified
                else {
                    return res
                        .status(200)
                        .send("Your account has been successfully verified");
                }
            });
        })
        .catch((e) => console.log("error", e));
}
module.exports = {
    registerUser,
    loginUser,
    getAllUSers,
    verifyUser
}