import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar navigate={navigate}/>
            <Outlet />
        </>
    )
}

export default Home