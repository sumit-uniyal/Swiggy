import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { ErrorToast, SuccessToast } from '../Toaster';
import {useDispatch} from 'react-redux'
import { login } from '../store/slices/UserSlice';

const LoginPopup = (props) => {
 
    const {setShowLogin} = props
    const [currState, setCurrState] = useState('Login')
    const [credential, setCredential] = useState('')

    const dispatch = useDispatch()
    
    let baseUrl = import.meta.env.VITE_BASE_URL

    // Google login Method
    const verifyToken = async()=>{
     
      const finalURL = `${baseUrl}api/user/google/login`
  
      try {
        const response = await axios.post(finalURL,{ 
          token: credential }, {
          withCredentials: true
        });
        
        if(response.status === 200){
          dispatch(login({name:response.data.name,email:response.data.email,isAdmin:response.data.isAdmin,userId:response.data.userId, }))
          setShowLogin(false)
          SuccessToast('Successfully Login')
        }
      } catch (error) {
        ErrorToast('Error in Sign-in '+error)
      }
    }

    useEffect(()=>{
      if(!credential){
        return
      }
      verifyToken()
    },[credential])
    
    // Simple login
    const [data, setData] = useState({
      name:'',
      email:'',
      password:''
    })

    const onChangeHandler = (e)=>{
        const {name, value} = e.target
        setData(prev => ({...prev, [name]:value}))
    }

    const submitHandler = async (e)=>{
      e.preventDefault()
      try {
        if(currState === 'Sign Up'){
          const final_url = `${baseUrl}api/user/register`
          const response = await axios.post(final_url,data)
          SuccessToast('Register Successfully')
          dispatch(login({name:response.data.name,email:response.data.email,isAdmin:response.data.isAdmin,userId:response.data.userId, }))
        }else{
          const final_url = `${baseUrl}api/user/login`
          const response = await axios.post(final_url,{
            email:data.email,
            password:data.password
          })
          dispatch(login({name:response.data.name,email:response.data.email,isAdmin:response.data.isAdmin,userId:response.data.userId, }))
          SuccessToast('Login Successfully')
        }
        
      } catch (error) {
        ErrorToast(error.response.data.msg)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={submitHandler} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>Sign in</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Login'? <></> :
          <input onChange={onChangeHandler} value={data.name} name='name' type='text' placeholder='Name' required />
          }
          
          <input onChange={onChangeHandler} value={data.email} name='email' type='email' placeholder='Email' required />
          <input onChange={onChangeHandler} value={data.password} name='password' type='password' placeholder='Password' required />
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