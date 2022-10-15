import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { userLogOutAction } from '../redux/action/authAction'
import { useEffect } from 'react'

export default function Navbar() {
    const dispath = useDispatch()
    const { login } = useSelector(state => state.auth)
    const handleLogOut = () => {
        dispath(userLogOutAction())
    }
    useEffect(() => {

    }, [login])
    return <>
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container">
                <Link to='/' class="navbar-brand px-4"><strong>Blogs</strong></Link>
                {
                    login && <>
                        <Link to='/account' class="navbar-brand"> <img src={`http://localhost:5000/${login.avatar}`} width={60} referrerPolicy="no-referrer" alt="" className='rounded' /></Link>
                        <Link to='/' class="nav-link active">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                    {login.name}
                                </button>
                                <ul class="dropdown-menu">
                                    {
                                        login.admin && <li><Link to='/dashboard' class="dropdown-item">Dashboard</Link></li>
                                    }
                                    <li><Link to='/account' class="dropdown-item">Account</Link></li>
                                    <li><Link to='/add-blog' class="dropdown-item">Add-Blog</Link></li>
                                    <li><button type="button" onClick={handleLogOut} class="btn btn-outline-danger">LogOut</button></li>
                                </ul>
                            </div>
                        </Link>
                    </>
                }
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ">

                        {/* <div className='d-flex mx-5 gap-3'>
                            <Link to='/' class="nav-link activ"><i class="bi bi-facebook"></i></Link>
                            <Link to='/' class="nav-link activ"><i class="bi bi-twitter"></i></Link>
                            <Link to='/' class="nav-link activ"><i class="bi bi-instagram"></i></Link>
                            <Link to='/' class="nav-link activ"><i class="bi bi-youtube"></i></Link>
                        </div> */}
                        <div className='navbar-nav mx-3'>
                            <Link to='/' class="nav-link active">Home</Link>
                            {/* <Link to='/' class="nav-link active">About</Link>
                            <Link to='/' class="nav-link active">Contact</Link> */}
                            {
                                !login && <Link to='/login' class="nav-link active">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}
