import React from 'react'
import ReactPlayer from 'react-player'
import { Button } from '@mui/material';


const VideoPlayer = ({files ,setFiles}) => {
    // useEffect(()=>{
    //     console.log("rendered")
    // },[files])
    const deleteUploadedVideo = (fileId) => {
        console.log(fileId)
        const updatedFilesList = files.filter((file) => file.id !== fileId);
        setFiles(updatedFilesList);
      }
    console.log(files)
    return (
        (   files && 
            <div className='cameraDisplay'>
                {
                    files.map((f) => (
                        <div><ReactPlayer key={f.id} url={URL.createObjectURL(f.file)} playing={true} loop={true} controls={true}  width="390px" height="300px" />
                            <div style={{ display: 'flex', justifyContent: 'center', gap:'1rem', marginTop:'5px'}}>
                                <Button variant='contained' onClick={() => deleteUploadedVideo(f.id)}>Delete</Button>
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