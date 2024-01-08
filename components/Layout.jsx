import React from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// import { Toaster } from 'react-hot-toast'
const Layout = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar navigate={navigate} />
            <Outlet />
        </>
    )
}

export default Layout