const express = require("express");
const router = require("express").Router();
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

    try {
        const admin = await admin.save();
        sendMail(admin.name, admin.email, admin.confirmationCode)
        res.json(admin);
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: "error", error: "Username already in use" });
        }
    }
};
const login = async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email }).lean()
    console.log(admin)
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
            if (user.status != "Active") {
                return res.status(401).send({
                    status: "Pending Account. Please Verify Your Email!", status: 'Pending',
                });
            }
            return res.json({
                status: 'ok',
                data: token,
                role: admin.type
            })
        } else {
            res.json({ status: 'error', error: 'Invalid password' })
        }
    } catch (error) {
        res.json({ status: 'error', error: 'Invalid email/password' })
    }
}
module.exports = {
    getAllAdmins,
    register,
    login
}