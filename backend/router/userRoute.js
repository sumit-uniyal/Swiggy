const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/google/login').post(userController.googleLogin)
router.route('/login').post(userController.login)
router.route('/register').post(userController.register)
router.route('/logout').post(userController.logout)

module.exports = router