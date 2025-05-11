import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SuccessToast, ErrorToast } from '../Toaster'
import { FaRegTrashCan } from "react-icons/fa6";

const List = () => {
  const [list,setList] = useState([])
  const base_url = import.meta.env.VITE_BASE_URL

  const fetchList = async()=>{
    const final_url = `${base_url}api/food/get`

    try {
      const response = await axios.get(final_url)
      if(response.status === 200){
        setList(response.data.data)
      }
    } catch (error) {
      console.log('error here '+error)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  const removeFood = async(id)=>{
    try {
      const final_url = `${base_url}api/food/remove`
      const response = await axios.post(final_url,{id:id})
      if(response.status === 200){
        await fetchList()
        SuccessToast('Item Removed Successfully')
      }
    } catch (error) {
      ErrorToast('Unable to Delete the item')
    }
  }
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((ele,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${base_url}images/${ele.image}`} />
              <p>{ele.name}</p>
              <p>{ele.category}</p>
              <p>{ele.price}</p>
              <p className='cross' onClick={()=>removeFood(ele._id)}><FaRegTrashCan /></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List