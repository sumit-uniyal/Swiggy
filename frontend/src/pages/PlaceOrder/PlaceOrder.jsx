import React, { useState } from 'react';
import './PlaceOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { SuccessToast, ErrorToast, WarningToast } from '../../components/Toaster';
import { clearCart } from '../../components/store/slices/CartSlice';

const PlaceOrder = () => {
  const food_item = useSelector(state => state.food.food_list);
  const cartItem = useSelector(state => state.cart.cartItem);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate total amount and prepare items for backend
  let totalAmount = 0;
  const items = [];

  Object.keys(cartItem).forEach(id => {
    const food = food_item.find(item => item._id === id);
    if (food) {
      const quantity = cartItem[id];
      totalAmount += food.price * quantity;
      items.push({
        name: food.name,
        price: food.price,
        quantity: quantity
      });
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // Simple validation
    for (let key in data) {
      if (!data[key].trim()) {
        return WarningToast(`${key} is required`);
      }
    }

    if (items.length === 0) {
      return WarningToast("Your cart is empty");
    }

    const payload = {
      items,
      amount: totalAmount + 50,
      address: {
        ...data
      }
    };

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const res = await axios.post(`${baseUrl}api/order/place`, payload, {
        withCredentials: true
      });

      if (res.status === 200) {
        SuccessToast("Order Placed Successfully");
        dispatch(clearCart());
       
      } else {
        ErrorToast("Order failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      ErrorToast("Something went wrong.");
    }
  };

  return (
    <form className='place-order' onSubmit={submitHandler}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" value={data.firstName} onChange={inputHandler} placeholder='First Name' />
          <input type="text" name="lastName" value={data.lastName} onChange={inputHandler} placeholder='Last Name' />
        </div>
        <input type="email" name="email" value={data.email} onChange={inputHandler} placeholder='Email' />
        <input type="text" name="street" value={data.street} onChange={inputHandler} placeholder='Street' />
        <div className="multi-fields">
          <input type="text" name="city" value={data.city} onChange={inputHandler} placeholder='City' />
          <input type="text" name="state" value={data.state} onChange={inputHandler} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" value={data.zipCode} onChange={inputHandler} placeholder='Zip Code' />
          <input type="text" name="country" value={data.country} onChange={inputHandler} placeholder='Country' />
        </div>
        <input type="text" name="phone" value={data.phone} onChange={inputHandler} placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹{items.length > 0 ? totalAmount : 0}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>₹{items.length > 0 ? 50 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹{items.length > 0 ? totalAmount + 50 : 0}</b>
            </div>
            <hr />
          </div>
          <button type="submit">Pay Now</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
