import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import LoginPopup from '../LoginPopup/LoginPopup'
import {useSelector} from 'react-redux'

const NavBar = () => {   
  const [menu, setMenu] = useState('home')
  const [showLogin, setShowLogin] = useState(false)
  const cartItem = useSelector(state => state.cart.cartItem)
  
  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' />
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu('home')} className={menu === 'home'? 'active': ''}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu === 'menu'? 'active': ''}>Menu</a>
        <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu === 'contact-us'? 'active': ''}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="" />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} />
          </Link>
          {Object.keys(cartItem).length > 0 ? <div className='dot'></div> : ''}
          
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign in</button>
        { showLogin && (
          <LoginPopup setShowLogin={setShowLogin} />
        )}
      </div>
    </div>
  )
}

export default NavBar