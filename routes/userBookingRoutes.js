
const express = require('express')
const router = express.Router()
const {
    getAllUserBookings, bookingsByEmail, registerBookings, deleteBooking
} = require('../controllers/userBookingControllers')


router.get('/:email', bookingsByEmail)
router.get('/', getAllUserBookings)
router.post('/', registerBookings)
router.delete('/:id', deleteBooking)

module.exports = router