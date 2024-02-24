import React from 'react';
import {BrowserRouter, createBrowserRouter, RouterProvider,Route, Routes, redirect} from 'react-router-dom'
import './App.css'
import Home from '../components/Home';
import Username from '../components/Username';
import Password from '../components/Password'
import Register from '../components/Register';
import Profile from '../components/Profile';
import Recovery from '../components/Recovery';
import Reset from '../components/Reset';
import PageNotFound from '../components/PageNotFound';
import Dashboard from '../components/Dashboard';
import { AuthorizeUser,ProtectRoute } from '../middleware/auth';
import { Toaster } from 'react-hot-toast';
import LiveVideo from '../components/LiveVideo';
import AnalyzeVideo from '../components/AnalyzeVideo';

function App() {  

  return (
    <>
      {/* <RouterProvider router={router}></RouterProvider> */}
      
      <BrowserRouter> 
        <Toaster position='top-center' reverseOrder={false}/>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Username />} />
              <Route path="register" element={<Register />} />
              <Route path="password" element={<Password />} />
              <Route path="profile" element={<Profile />} />
              <Route path="recovery" element={<Recovery />} />
              <Route path="reset" element={<Reset />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="livevideo" element={<LiveVideo />} />
              <Route path="analyzevideo" element={<AnalyzeVideo />} />
              <Route path="*" element={<PageNotFound />}/>
            </Route>
          </Routes>
      </BrowserRouter>
    
    </>  
  );
  
}

export default App
