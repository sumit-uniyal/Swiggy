const food = require('../models/foodModal')
const fs = require('fs')

const addFood = async(req,res)=>{
    try {
        const {name, price, description,category} = req.body

        const addFoodItem = await food.create({
            name,
            price,
            description,
            category,
            image:req.file.filename
        })
        res.status(201).json({msg:'Food added successfully'})
    } catch (error) {
        res.status(400).json({msg:'Unable to add food at this time '+error})
    }
}

const getFood = async(req,res)=>{
    try {
        const foodItem = await food.find().select('_id name image price description category').lean();
        res.status(200).json({msg:'Food get successfullys',data:foodItem})
    } catch (error) {
        res.status(400).json({msg:'Unable to get food at this time '+error})
    }
}

const removeFood = async(req,res)=>{
    try {
        const foodDetail = await food.findById(req.body.id)
        fs.unlink(`uploads/${foodDetail.image}`,()=>{})
        await food.findByIdAndDelete(foodDetail._id)
        
        res.status(200).json({msg:'Successfully deleted'})
    } catch (error) {
        res.status(400).json({msg:'Unable to delete food at this time '+error})
    }
}

module.exports = {addFood,getFood,removeFood}