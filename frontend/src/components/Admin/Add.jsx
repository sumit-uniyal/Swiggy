import React, { useState } from 'react'
import './Admin.css'
import {assets} from '../../assets/assets'
import axios from 'axios'
import { SuccessToast, ErrorToast, WarningToast } from '../../components/Toaster'

const Add = () => {

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name:'',
    description:'',
    category:'',
    price:''
  })
  const inputHandler = (e)=>{
      const {name,value} = e.target
      setData(prev=>({...data,[name]:value}))
  }


 const submitHandler = async(e)=>{
   e.preventDefault()

  //  Validation Frontend
  if (!image) return WarningToast('Please upload an image');
  if (!data.name.trim()) return WarningToast('Product name is required');
  if (!data.description.trim()) return WarningToast('Product description is required');
  if (!data.category.trim()) return WarningToast('Product category is required');
  if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
    return WarningToast('Please enter a valid product price');
  }

  try {
    const formData = new FormData();
    formData.append('image', image)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('price', data.price)

    const baseUrl = import.meta.env.VITE_BASE_URL
    const api_url = `${baseUrl}api/food/add`
    
    const response = await axios.post(api_url,formData)

    if(response.status === 201){
      setData({
        name:'',
        description:'',
        category:'',
        price:''
      })
      setImage(false)
      SuccessToast('Item Added Successfully')
    }

  } catch (error) {
    ErrorToast('Unable to add Item this time ')
  }
 }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={submitHandler} >
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
              <img src={image?URL.createObjectURL(image):assets.upload_area} />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden />
        </div>
        <div className="add-product-name">
          <p>Product Name</p>
          <input onChange={inputHandler} value={data.name} type='text' name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={inputHandler}  name='description' rows='6' placeholder='Type here' value={data.description}></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name='category' onChange={inputHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={inputHandler} value={data.price} type='number' name='price' placeholder='20' />
          </div>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add