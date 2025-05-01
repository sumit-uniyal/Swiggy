import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'

const LoginPopup = (props) => {
    const {setShowLogin} = props
    const [currState, setCurrState] = useState('Sign Up')
    const [credential, setCredential] = useState('')
    

    const verifyToken = async()=>{
      const baseUrl = import.meta.env.VITE_BASE_URL
      const finalURL = `${baseUrl}api/user/google/login`
  
      try {
        const response = await axios.post(finalURL,{ 
          token: credential }, {
          withCredentials: true
        });
        
        if(response.status === 200){
          console.log('Successfully Login')
        }
      } catch (error) {
        console.log('Error in Sign-in '+error)
      }
    }


    useEffect(()=>{
      if(!credential){
        return
      }
      verifyToken()
    },[credential])
    
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className="login-popup-title">
          <h2>Sign in</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Login'? <></> :
          <input type='text' placeholder='Name' required />
          }
          
          <input type='email' placeholder='Email' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button>{currState === 'Sign Up'?'Create Account' : 'Login'} </button>
        <div className='sign-btn'>
          <GoogleLogin 
            onSuccess={(credentialResponse) => {
              setCredential(credentialResponse.credential); // just the token
            }}
            onError={() => {
              console.log('Login Failed');
            }}
           
          />
        </div>
        
        
        {currState === 'Login'
          ?<p className='sign-btn'>Create a new Account?<span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
          :<p className='sign-btn'>Already have an account <span onClick={()=>setCurrState('Login')}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup