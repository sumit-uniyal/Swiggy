import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import { RouterProvider } from "react-router/dom";
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Layout from './components/Navbar/Layout';

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
    }
  ])
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App