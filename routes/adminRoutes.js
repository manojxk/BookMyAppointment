
const express = require('express')
const router = express.Router()
const {
    getAllAdmins, register, login, verifyUser
} = require('../controllers/adminController')


router.post('/', register)
router.get('/', getAllAdmins)
router.post('/login', login)
router.get('/confirm/:confirmationCode', verifyUser)

module.exports = router