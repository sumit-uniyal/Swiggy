import React, { useEffect } from 'react'
import './FoodDisplay.css'
import { useSelector,useDispatch } from 'react-redux'
import FoodItem from '../FoodItem/FoodItem'
import { apiData } from '../store/slices/FoodSlice'
import { fetchCart } from '../store/slices/CartSlice';

const FoodDisplay = (props) => {
  const dispatch = useDispatch()
  const {category} = props
  const foodList = useSelector((state)=> state.food.food_list)
  const cartItem = useSelector((state)=> state.cart.cartItem)

  useEffect(() => {
    dispatch(apiData()); 
  }, []);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((ele,index)=>{
          if(category === 'All' || category === ele.category){
            return <FoodItem key={index} id={ele._id} name={ele.name}  price={ele.price} image={ele.image} description={ele.description} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay