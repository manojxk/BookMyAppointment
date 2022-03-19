const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require('../models/adminModel')
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
    const admin = new Admin({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        authkey: req.body.authkey,
        type: "admin",
    });
    if (req.body.password.length < 6) {
        return res.json({
            status: "error",
            error: "Password too small. Should be atleast 6 characters",
        });
    }
    try {
        const savedAptadmin = await admin.save();
        res.json(savedAptadmin);
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