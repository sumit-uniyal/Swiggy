import React from 'react'
import Navbar from './Admin/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Admin/sidebar/Sidebar'

const AdminLayout = () => {
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

export default AdminLayout