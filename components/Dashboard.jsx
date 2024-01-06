import React, {useState} from 'react'
import UploadPreview from './UploadPreview'
import VideoPlayer from './VideoPlayer'
const Dashboard = () => {
    const [files,setFiles] = useState([])
    const HandleUploadFinish = (newFile) => {
        setFiles((prevFiles) => [...prevFiles,...newFile])
    }
    return (
        <> 
            <UploadPreview UploadHandler={HandleUploadFinish} />
            <VideoPlayer files={files} setFiles={setFiles}/>
        </>
    )
}

export default Dashboard