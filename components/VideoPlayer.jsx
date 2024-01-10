import React from 'react'
import ReactPlayer from 'react-player'
import { Button } from '@mui/material';
import axios from 'axios';


const VideoPlayer = ({videos, files ,setFiles}) => {
    const deleteUploadedVideo = (videoId) => {
        console.log(videoId)
        const updatedFilesList = files.filter((file) => file.id !== videoId);
        setFiles(updatedFilesList);
    }
    const sendVideoToBackEnd = async (video) => {
        console.log('sendVideoToBackEnd')
        console.log(video)
        const data = await axios.post('http://localhost:5000//api/video',video)
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
    return (
        (   videos && 
            <div className='cameraDisplay'>
                {
                    videos.map((vid) => (
                        <div className='videoContainer'>
                            <ReactPlayer key={vid._id} url={vid.videolink} playing={true} loop={true} controls={true} width='100%' height='300px' />
                                <div style={{ display: 'flex', justifyContent: 'center', gap:'1rem', marginTop:'5px'}}>
                                    <Button variant='contained' onClick={() => deleteUploadedVideo(vid._id)}>Delete</Button>
                                    <Button variant='contained' onClick={() => sendVideoToBackEnd(vid)} >Analyze</Button>
                                </div>
                        </div>
                    ))
                }
            </div>
        )
    )
}
export default VideoPlayer