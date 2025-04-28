import React from 'react'
import './FoodDisplay.css'
import { useSelector } from 'react-redux'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = (props) => {
  const {category} = props
  const foodList = useSelector((state)=> state.food.food_list)

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