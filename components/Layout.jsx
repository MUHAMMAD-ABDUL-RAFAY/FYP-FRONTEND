import React from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import Navbar from './Navbar'
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