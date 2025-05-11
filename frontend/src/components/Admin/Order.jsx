import axios from 'axios'
import { useState, useEffect } from 'react'
import './Admin.css'

const Order = () => {
  const [list, setList] = useState([])
  const base_url = import.meta.env.VITE_BASE_URL

  const fetchList = async () => {
    const final_url = `${base_url}api/order/get`

    try {
      const response = await axios.post(final_url)
      if (response.status === 200) {
        setList(response.data.data)
      }
    } catch (error) {
      console.log('Error fetching orders: ' + error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="order-page">
      <h1 className="order-title">My Orders</h1>
      {list.length === 0 ? (
        <p className="order-empty">No orders found.</p>
      ) : (
        list.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h2>Order #{order._id.slice(-6)}</h2>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-body">
              <div className="order-section">
                <h3>Shipping Details</h3>
                <p>Name:{order.address.firstName} {order.address.lastName}</p>
                <p>Address:{order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                <p>Country:{order.address.country}</p>
                <p>Email: {order.address.email}</p>
                <p>Phone: {order.address.phone}</p>
              </div>

              <div className="order-section">
                <h3>Order Info</h3>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p><strong>Payment:</strong> {order.payment ? 'Paid' : 'Pending'}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              </div>

              <div className="order-section">
                <h3>Items</h3>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} — ₹{item.price} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Order
