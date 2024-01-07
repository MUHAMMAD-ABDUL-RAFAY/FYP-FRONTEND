import React, {useEffect, useState} from 'react'
import UploadPreview from './UploadPreview'
import VideoPlayer from './VideoPlayer'
import { getAllVideos } from '../helper/helper'
const Dashboard = () => {
    const [files,setFiles] = useState([])
    const [videos,setVideos] = useState(null)
    const HandleUploadFinish = (newFile) => {
        setFiles((prevFiles) => [...prevFiles,...newFile])
    }
    useEffect(() => {
        console.log("useeffet called")
        const getAllUploadedVideos = async () => {
            const {data} = await getAllVideos()
            if(data.status === 200)
            {   
                console.log(data.data.videos)
                setVideos(data.data.videos)
            }
        }
        getAllUploadedVideos()
    },[files])
    return (
        <> 
            <UploadPreview UploadHandler={HandleUploadFinish} />
            <VideoPlayer videos={videos} files={files}  setFiles={setFiles}/>
        </>
    )
}

export default Dashboard