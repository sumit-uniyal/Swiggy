const userModal = require("../models/userModal");

const addToCart = async(req,res)=>{
    try {
        const {cart} = req.body
        const userId = req.user.userId;
        const userData = await userModal.findById(userId)
        userData.cartData = cart;
        await userData.save();
        res.status(201).json({msg:'Added to cart'})
    } catch (error) {
        return res.status(401).json({msg:'some error '+error})
    }
}


const getCart = async(req,res)=>{
    try {
        const {userId} = req.user
        const userData = await userModal.findById(userId)
        res.status(200).json({data:userData.cartData})
    } catch (error) {
        return res.status(401).json({msg:'some error'+error})
    }
}



module.exports = {addToCart, getCart}