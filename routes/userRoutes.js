const express = require('express')
const router = express.Router()
const {
    registerUser, loginUser, getAllUSers
} = require('../controllers/userController')
router.post('/', registerUser)
router.get('/', getAllUSers)
router.post('/login', loginUser)
module.exports = router