const express = require('express')
const router = express.Router()
const {
    registerUser, loginUser, getAllUSers, verifyUser
} = require('../controllers/userController')
router.post('/', registerUser)
router.get('/', getAllUSers)
router.post('/login', loginUser)
router.get('/confirm/:confirmationCode', verifyUser)
module.exports = router