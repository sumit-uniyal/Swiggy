const express = require('express')
const router = express.Router()
const orderController = require('../controllers/OrderController')
const authMiddleware = require('../middleware/authMiddleware')

router.route('/place').post(authMiddleware,orderController.placeOrder)
router.route('/get').post(orderController.getOrder)

module.exports = router