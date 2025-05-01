import React from 'react'
import {createBrowserRouter} from 'react-router'
import Layout from './components/Navbar/Layout'
import {RouterProvider} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
        {
          path: 'add',
          element:<Add />
        },
        {
          path:'list',
          element:<List />
        },
        {
          path:'orders',
          element:<Orders />
        }
      ]
    }
  ])


  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App