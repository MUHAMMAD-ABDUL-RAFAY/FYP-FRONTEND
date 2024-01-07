import React from 'react'
import ReactPlayer from 'react-player'
import { Button } from '@mui/material';


const VideoPlayer = ({videos, files ,setFiles}) => {
    const deleteUploadedVideo = (videoId) => {
        console.log(videoId)
        const updatedFilesList = files.filter((file) => file.id !== videoId);
        setFiles(updatedFilesList);
      }
    console.log(files)
    return (
        (   videos && 
            <div className='cameraDisplay'>
                {
                    videos.map((vid) => (
                        <div><ReactPlayer key={vid._id} url={vid.videolink} playing={true} loop={true} controls={true}  width="390px" height="300px" />
                            <div style={{ display: 'flex', justifyContent: 'center', gap:'1rem', marginTop:'5px'}}>
                                <Button variant='contained' onClick={() => deleteUploadedVideo(vid._id)}>Delete</Button>
                                <Button variant='contained'>Analyze</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    )
}
export default VideoPlayer