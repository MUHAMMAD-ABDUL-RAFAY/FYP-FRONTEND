// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import UploadPreview from '../components/UploadPreview';
import Navbar from '../components/Navbar';
import './App.css'
import VideoPlayer from '../components/VideoPlayer';
import { useState } from 'react';
function App() {
  const [files,setFiles] = useState([])
  const HandleUploadFinish = (newFile) => {
    setFiles((prevFiles) => [...prevFiles,...newFile])
  }
  return (
    <>
      <Navbar />
      <UploadPreview files={files} UploadHandler={HandleUploadFinish} />
      <VideoPlayer files={files} setFiles={setFiles}/>
    </>  
  );
  
}

export default App
