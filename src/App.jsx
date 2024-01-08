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

function App() {  
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Username />
//   },
//   {
//     path: '/register',
//     element: <Register />
//   },
//   {
//     path: '/password',
//     element: <Password />
//   },
//   {
//     path: '/profile',
//     element: <AuthorizeUser><Profile /></AuthorizeUser>
//   },
//   {
//     path: '/recovery',
//     element: <Recovery />
//   },
//   {
//     path: '/reset',
//     element: <Reset />
//   },
//   {
//     path: '/dashboard',
//     element: <ProtectRoute>
//                 <UploadPreview files={files} UploadHandler={HandleUploadFinish} />
//                 <VideoPlayer files={files} setFiles={setFiles}/>
//               </ProtectRoute>
//   },
//   {
//     path: '*',
//     element: <PageNotFound />
//   }

// ])
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
            <Route path="*" element={<PageNotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    
    </>  
  );
  
}

export default App
