import { useState } from 'react'
import './Navbar.css'
import { persistor } from '../store/Store';
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import LoginPopup from '../LoginPopup/LoginPopup'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/slices/UserSlice'
import { ErrorToast, SuccessToast } from '../Toaster';
import { clearCart } from '../store/slices/CartSlice';
import axios from 'axios';

const NavBar = () => {  
  const dispatch = useDispatch() 
  const [menu, setMenu] = useState('home')
  const [showLogin, setShowLogin] = useState(false)
  const cartItem = useSelector(state => state.cart.cartItem)
  const userData = useSelector(state => state.user)

  const handleLogout = async() => {
    try {
        const base_url = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${base_url}api/user/logout`,{},{
          withCredentials: true
        })
        if(response.status == 200){
          dispatch(logout());
          dispatch(clearCart())
          persistor.purge();
          localStorage.clear();
          SuccessToast('Log out Successfully')
        }
    } catch (error) {
        ErrorToast('Unable to Logout')
    }
  };

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' />
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu('home')} className={menu === 'home'? 'active': ''}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu === 'menu'? 'active': ''}>Menu</a>
        <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu === 'contact-us'? 'active': ''}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} />
          </Link>
          {Object.keys(cartItem).length > 0 ? <div className='dot'></div> : ''}
          
        </div>
        {userData.email ? <button onClick={handleLogout} >Log out</button> 
                  : <button onClick={()=>setShowLogin(true)}>Log In</button>
        }


        
    
        { showLogin && (
          <LoginPopup setShowLogin={setShowLogin} />
        )}
      </div>
    </div>
  )
}

export default NavBar