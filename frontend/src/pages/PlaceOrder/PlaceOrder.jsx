import React from 'react'
import './PlaceOrder.css'
import {useSelector} from 'react-redux'

const PlaceOrder = () => {
    const food_item = useSelector(state => state.food.food_list)
    const cartItem = useSelector(state => state.cart.cartItem)
    let totalAmount = 0;

    Object.keys(cartItem).forEach(id=>{
      const food = food_item.find(item => item._id === id)
      if (food) {
        totalAmount += food.price * cartItem[id]
      }
    })
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹{Object.keys(cartItem).length > 0 ? totalAmount : 0}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>₹{Object.keys(cartItem).length > 0 ? 50 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹{Object.keys(cartItem).length > 0 ? totalAmount + 50 : 0}</b>
            </div>
            <hr />
          </div>
            <button >Pay Now</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder