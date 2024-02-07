import React, {useContext, useEffect, useState} from 'react'
import UploadPreview from './UploadPreview'
import VideoPlayer from './VideoPlayer'
import { getAllVideos } from '../helper/helper'
const Dashboard = () => {
    const [files,setFiles] = useState([])
    const [videos,setVideos] = useState(null)
    const HandleUploadFinish = (newFile) => {
        setFiles((prevFiles) => [...prevFiles,...newFile])
    }
    const handleDelete = (videoId) => {
        const updatedVideosList = videos.filter((vid) => vid._id !== videoId)
        setVideos(updatedVideosList)
    }
    useEffect(() => {
        const getAllUploadedVideos = async () => {
            const {data} = await getAllVideos()
            if(data.status === 200)
            {   
                console.log("videos",data.data.videos)
                setVideos(data.data.videos)
            }
        }
        getAllUploadedVideos()
    },[files])
    return (
        <> 
            <UploadPreview UploadHandler={HandleUploadFinish} />
            <VideoPlayer videos={videos} setVideos={setVideos} files={files}  setFiles={setFiles} handleDelete={handleDelete}/>
            
        </>
    )
}

export default Dashboard