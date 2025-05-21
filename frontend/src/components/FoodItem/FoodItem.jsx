import React, { useState } from 'react'
import './FoodItem.css'
import {assets} from '../../assets/assets'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../store/slices/CartSlice'

const FoodItem = (props) => {
  const {id, name, price, description,image} = props

  const getCart = useSelector(state => state.cart.cartItem)

  const dispatch = useDispatch()

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={`${import.meta.env.VITE_BASE_URL}images/${image}`} />
            {!getCart[id]
            ?<img className='add' onClick={()=>dispatch(addToCart({id}))} src={assets.add_icon_white} />
            :<div className='food-item-counter'>
                <img onClick={()=>dispatch(removeFromCart({id}))} src={assets.remove_icon_red} />
                <p>{getCart[id]}</p>
                <img onClick={()=>dispatch(addToCart({id}))} src={assets.add_icon_green} />
             </div>}
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts } />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItem