import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './component/Navbar'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Register'
import Account from './pages/user/Account'
import AddBlog from './pages/user/AddBlog'
import LoginOnly from './pages/user/LoginOnly'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginOnly from './pages/admin/AdminLoginOnly'
import Dashboard from './pages/admin/Dashboard'

export default function App() {
  return <BrowserRouter>
    <Navbar />
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='*' element={<PageNotFound />} />

      {/* user */}
      <Route path='/account' element={<LoginOnly element={<Account />} />} />
      <Route path='/add-blog' element={<LoginOnly element={<AddBlog />} />} />
      {/* admin */}
      <Route path='/dashboard' element={<AdminLoginOnly element={<Dashboard />} />} />

    </Routes>
  </BrowserRouter>
}
