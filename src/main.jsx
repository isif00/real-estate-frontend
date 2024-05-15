import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Client from './Pages/Client.jsx';

import Transaction from './Pages/Transaction.jsx';

import { NavBar } from './components/MainComponents/NavBar/NavBar'
import SideNavBar from './components/MainComponents/SideNavBar/SideNavBar'
import Dashboard from './Pages/Dashboard.jsx';
import RealEstate from './Pages/RealEstate.jsx';
import Errorpage from './Pages/Erorrpage.jsx';


const router = createBrowserRouter([
  {
    path: "/client",
    element: <Client />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/transaction",
    element: <Transaction />,
  },
  {
    path: "/real-estate",
    element: <RealEstate />,
  },
  {
    path: "/*",
    element: <Errorpage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <SideNavBar />
    <RouterProvider router={router} />
  </React.StrictMode>
)
