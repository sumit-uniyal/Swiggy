const order = require('../models/orderModal')
const userModal = require('../models/userModal')

const placeOrder = async (req, res) => {

  try {
    const userId = req.user.userId;
    const { items, amount, address } = req.body;

    const newOrder = new order({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModal.findByIdAndUpdate(userId, { cartData: {} });


    res.status(200).json({msg:'Order placed successfully' });

  } catch (error) {
    res.status(500).json({msg: 'Something went wrong' });
  }
};

const getOrder = async(req,res)=>{
  try {
    const orderData =await order.find()
    res.status(200).json({ data: orderData})
  } catch (error) {
    res.status(500).json({msg:'Something went wrong'+error });
  }
}

module.exports = {placeOrder,getOrder}