
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import UploadPreview from '../components/UploadPreview';
import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';
import Username from '../components/Username';
import Password from '../components/Password'
import Register from '../components/Register';
import Profile from '../components/Profile';
// import Recovery from '../components/Recovery';
// import Reset from '../components/Reset';
// import PageNotFound from '../components/PageNotFound';

import { AuthorizeUser,ProtectRoute } from '../middleware/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/password',
    element: <Password />,
  },
  {
    path: '/profile',
    element: <Profile />
  }

])

function App() {
  const [files,setFiles] = useState([])
  const HandleUploadFinish = (newFile) => {
    setFiles((prevFiles) => [...prevFiles,...newFile])
  }
  return (
    <>
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
      
      {/* <UploadPreview files={files} UploadHandler={HandleUploadFinish} />
      <VideoPlayer files={files} setFiles={setFiles}/> */}
    </>  
  );
  
}

export default App
