
const express = require('express')
const router = express.Router()
const {
    getAllAdmins, register, login
} = require('../controllers/adminController')


router.post('/', register)
router.get('/', getAllAdmins)
router.post('/login', login)


module.exports = router