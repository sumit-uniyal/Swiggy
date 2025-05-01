import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import './Layout.css'

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="layout-container">
      <hr />
      <Sidebar />
      
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
