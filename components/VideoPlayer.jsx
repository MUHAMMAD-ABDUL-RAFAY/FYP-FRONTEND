import React, { useContext, useState } from 'react'
import ReactPlayer from 'react-player'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { deleteVideo } from '../helper/helper';
import {CircularProgress} from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const VideoPlayer = ({videos,setVideos,files,setFiles,handleDelete}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [selectedVideo,setSelectedVideo] = useState(null)
    const [deleting,setDeleting] = useState(false)
    const navigate = useNavigate();
    const deleteUploadedVideo = async (video) => {
        console.log(video)
        setIsOpen(true);
        setDeleting(true);
        setSelectedVideo(video);
        const {data} = await deleteVideo(video);
        console.log(data)
        if(data.status === 200){
            console.log("files",files)
            console.log("videos",videos)
            // const updatedFilesList = files.filter((file) => file.id !== video._id);
            // setFiles(updatedFilesList);
            handleDelete(video._id)
            
            console.log("afterF",files)
            console.log("afterV",videos)
            toast.success(data.data.msg)
        }
        else{
            console.log(data.data.msg)
            toast.error(data.data.msg)
        }
        setSelectedVideo(null)
        setDeleting(false)
        setIsOpen(false)
    }
    const sendVideoToBackEnd = async (video) => {
        console.log('sendVideoToBackEnd')
        console.log(video)
        const data = await axios.post('http://localhost:5000/api/video',video)
        // const res = await fetch(`http://localhost:5000/video`,
        // {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(video)
        // })
        // const data = await res.json()
        console.log(data)
    }
    const analyzeHandler = (video) => {
        navigate('/analyzevideo',{state: {video}})
    }
    return (
        (   videos && 
            <>
                <div className='cameraDisplay'>
                    {
                        videos.map((vid) => (
                            <div className='videoContainer'>
                                <ReactPlayer key={vid._id} url={vid.videolink} playing={true} loop={true} controls={true} width='100%' height='300px' />
                                    <div style={{ display: 'flex', justifyContent: 'center', gap:'1rem', marginTop:'5px'}}>
                                        <Button variant='contained' onClick={() => analyzeHandler(vid)} >Analyze</Button>
                                        <Button variant='contained' color='error' onClick={() => {
                                            console.log(vid)
                                            setIsOpen(true)
                                            setSelectedVideo(vid)
                                        }}>Delete</Button>
                                        
                                    </div>
                            </div>
                        ))
                    }
                    {isOpen &&
                        <Dialog open={isOpen}>
                            <DialogTitle>Delete Video</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Are you sure you want to delete {selectedVideo.videoname} video?</DialogContentText>
                            </DialogContent>
                            
                            <DialogActions>
                                <Button variant='contained' onClick={() => {
                                    setIsOpen(false)
                                    setSelectedVideo(null)
                                    }} >Cancel</Button>
                                <Button variant='contained' color='error' onClick={() => deleteUploadedVideo(selectedVideo)}>
                                    {deleting ? <CircularProgress size={"1rem"} color='inherit' style={{marginRight: '5px'}}/> : ''} Delete</Button>
                            </DialogActions>
                        </Dialog>
                    }
                </div>
            </>
        )
    )
}
export default VideoPlayer