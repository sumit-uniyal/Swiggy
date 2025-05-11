import { assets } from '../../../assets/frontend_assets'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <hr />
      <div className='sidebar'>
        <div className="sidebar-options">
          <NavLink to='/admin' className="sidebar-option">
            <img src={assets.add_icon} />
            <p>Add Items</p>
          </NavLink>
          <NavLink to='/admin/list' className="sidebar-option">
            <img src={assets.order_icon} />
            <p>List Items</p>
          </NavLink>
          <NavLink to='/admin/orders' className="sidebar-option">
            <img src={assets.order_icon} />
            <p>Orders Items</p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar