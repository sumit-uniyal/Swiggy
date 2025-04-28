import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = (props) => {
    const {category, setCategory} = props
    
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Feeling hungry? Discover a wide variety of mouth-watering dishes from your favorite local restaurants. With just a few clicks, you can order, relax, and enjoy hot, fresh meals delivered straight to your doorstep—fast, easy, and delicious every time!</p>
        <div className="explore-menu-list">
        {menu_list.map((ele, index)=>{
            return (
                <div onClick={()=>setCategory(prev => prev === ele.menu_name ? 'All' : ele.menu_name)} className='explore-menu-list-item' key={index}>
                    <img className={category === ele.menu_name ? 'active': ''} src={ele.menu_image} />
                    <p>{ele.menu_name}</p>
                </div>
            )
        })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu