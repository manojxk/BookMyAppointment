const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Userbooking = require('../models/userbookingModel')
require("dotenv").config();
// @desc    Get all the user bookings
// @route   POST /api/admins
// @access  Private
const getAllUserBookings = async (req, res) => {
    try {
        const userbookings = await Userbooking.find();
        res.json(userbookings);
    } catch (err) {
        res.json({ message: err });
    }
}
// @desc    Get bookings by email
// @route   POST /api/admins
// @access  Private
const bookingsByEmail = async (req, res) => {
    let regex = new RegExp(req.params.email, 'i');
    try {
        const bookingByEmail = await Userbooking.find({ email: regex });
        res.json(bookingByEmail);
    } catch (err) {
        res.json({ message: err });
    }
}

const registerBookings = async (req, res) => {
    const newUserbooking = new Userbooking({
        name: req.body.name,
        email: req.body.email,
        time: req.body.time,
        date: req.body.date,
        isBooked: req.body.isBooked
    });
    try {
        const savedUserbooking = await newUserbooking.save();
        res.json(savedUserbooking);
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: "error", error: "Booking cannot be done" });
        }
    }
}
const deleteBooking = async (req, res) => {
    try {
        const deleteBooking = await Userbooking.remove({ _id: req.params.id });
        res.json(deleteBooking);
    } catch (err) {
        res.json({ message: err })
    }
}
module.exports = {
    getAllUserBookings,
    bookingsByEmail,
    registerBookings,
    deleteBooking
}