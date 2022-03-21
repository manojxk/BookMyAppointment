
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require('../models/adminModel')
const config = require('../config/auth.config.js');
const { sendMail } = require("../config/nodemailer.config");
require("dotenv").config();
// @desc    Get the admins
// @route   GET /api/admins
// @access  Private
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
        res.json(admins)
    } catch (error) {
        res.json({ message: error });
    }
}
// @desc    Register admins
// @route   POST /api/admins
// @access  Private
const register = async (req, res) => {
    const token = jwt.sign({ email: req.body.email }, config.secret);
    const admin = new Admin({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        authkey: req.body.authkey,
        type: "admin",
        confirmationCode: token,
    });

    admin.save((err, admin) => {
        if (err) {
            res.json({ error: err });
        }
        sendMail(admin.authkey, admin.email, admin.confirmationCode, 'admins')

        res.json(admin);
    });

};
const login = async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email }).lean()
    if (!admin) {
        return res.json({ status: 'error', error: 'Invalid emaill/password' })
    }
    try {
        if (await bcrypt.compare(password, admin.password)) {
            // the username, password combination is successful
            const token = jwt.sign(
                {
                    id: admin.id,
                    email: admin.email
                },
                process.env.JWT_SECRET
            )

            return res.json(admin)
        } else {
            res.json({ status: 'error', error: 'Invalid password' })
        }
    } catch (error) {
        res.json({ status: 'error', error: 'Invalid email/password' })
    }
}
const verifyUser = async (req, res) => {
    Admin.findOne({
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
    getAllAdmins,
    register,
    login,
    verifyUser
}