import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './Cart.css'
import { removeFromCart } from '../../components/store/slices/CartSlice'

const Cart = () => {
  const food_item = useSelector(state => state.food.food_list)
  const cartItem = useSelector(state => state.cart.cartItem)
  const dispatch = useDispatch()

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
        {food_item.map((ele)=>{
          if(cartItem[ele._id] > 0){
            return (
              <div key={ele._id} >
                <div className='cart-items-title cart-items-item'>
                  <img src={ele.image} />
                  <p>{ele.name}</p>
                  <p>₹{ele.price}</p>
                  <p>{cartItem[ele._id]}</p>
                  <p>{ele.price * cartItem[ele._id]}</p>
                  <p onClick={()=>dispatch(removeFromCart({id:ele._id}))} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Cart