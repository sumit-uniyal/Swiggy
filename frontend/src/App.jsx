import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import { RouterProvider } from "react-router/dom";
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Layout from './components/Navbar/Layout';
import { ToastContainer } from 'react-toastify';
import AdminLayout from './components/AdminLayout';
import Add from './components/Admin/Add';
import List from './components/Admin/List';
import Order from './components/Admin/Order';

const App = () => {
   
  let router = createBrowserRouter([
    {
      path: '/',
      element:<Layout />,
      children:[
        {
          path: "/",
          element: <Home />,
        },{
          path: '/cart',
          element: <Cart />
        },{
          path: '/order',
          element: <PlaceOrder />
        }
      ]
    },{
        path: '/admin',
        element:<AdminLayout />,
        children:[
          {
            path: '',
            element: <Add />,
          },
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'orders',
            element: <Order />,
          },
        ]
    }
  ])
  return (
    <div className='app'>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App