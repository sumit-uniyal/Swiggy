const express =  require('express')
const router = express.Router()
const cartController = require('../controllers/cartController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/get').get(authMiddleware,cartController.getCart)
router.route('/add').post(authMiddleware,cartController.addToCart)

module.exports = router