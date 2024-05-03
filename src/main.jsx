import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Client from './Pages/Client.jsx';
import RealEstate from './Pages/RealEstate.jsx';
import Transaction from './Pages/Transaction.jsx';

import { NavBar } from './components/MainComponents/NavBar/NavBar'
import SideNavBar from './components/MainComponents/SideNavBar/SideNavBar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
  },
  {
    path: "/RealEstate",
    element: <RealEstate />,
  },
  {
    path: "/Transaction",
    element: <Transaction />,
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <SideNavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
