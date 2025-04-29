import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './Cart.css'
import { removeFromCart } from '../../components/store/slices/CartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const food_item = useSelector(state => state.food.food_list)
  const cartItem = useSelector(state => state.cart.cartItem)
  const dispatch = useDispatch()

  let totalAmount = 0;

  Object.keys(cartItem).forEach(id=>{
    const food = food_item.find(item => item._id === id)
    if (food) {
      totalAmount += food.price * cartItem[id]
    }
  })

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItem).length > 0 ? (
          food_item.map((ele) => {
            if (cartItem[ele._id] > 0) {
              return (
                <div key={ele._id}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={ele.image} alt={ele.name} />
                    <p>{ele.name}</p>
                    <p>₹{ele.price}</p>
                    <p>{cartItem[ele._id]}</p>
                    <p>₹{ele.price * cartItem[ele._id]}</p>
                    <p onClick={() => dispatch(removeFromCart({ id: ele._id }))} className='cross' > X</p>
                  </div>
                  <hr />
                </div>
              )
            }
            return null;
          })
        ) : (
          <p className='cart-empty'>Cart is Empty</p>
        )}
        
      </div>
      <div className="cart-bottom">
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
            <button onClick={()=> navigate('/order')}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart