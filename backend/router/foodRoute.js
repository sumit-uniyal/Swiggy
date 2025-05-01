const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const multer = require('multer')

// image upload
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


// Routes
router.route('/add').post(upload.single('image'),foodController.addFood)
router.route('/get').get(foodController.getFood)
router.route('/remove').post(foodController.removeFood)


module.exports = router