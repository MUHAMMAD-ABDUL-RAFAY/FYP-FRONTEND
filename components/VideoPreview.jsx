import React, { useState, useEffect } from 'react';
import { Dropzone, FileCard } from '@files-ui/react';
import ReactPlayer from 'react-player'
import { Button } from '@mui/material';

// import videoURL from '../public/aahiltest1.mp4'
function VideoPreview() {
    const [files, setFiles] = useState([]);
    const [underUploadFiles,setUnderUploadFiles] = useState([])
    // const [videoURL,setVideoURL] = useState([])
    console.log(files)
    // console.log(videoURL)
    const updateFiles = (acceptedFiles) => {
      // console.log("accepted: ",acceptedFiles)
      // console.log(acceptedFiles[0].file)
      // console.log(URL.createObjectURL(acceptedFiles[0].file))
      setUnderUploadFiles(acceptedFiles)
      
      // setFiles((prevFiles) => [...prevFiles,acceptedFiles[0]])
      // setVideoURL((prevURLs) => [...prevURLs,URL.createObjectURL(acceptedFiles[0].file)])
    };
    const UploadFinish = () => {
      console.log("Upload Finished")
      setFiles((prevFiles) => [...prevFiles,underUploadFiles[0]])
    }
    const removeFile = (fileId) => {
      console.log(fileId)
      const updatedFilesList = underUploadFiles.filter((file) => file.id !== fileId);
      setUnderUploadFiles(updatedFilesList);
    }
    // useEffect(() => {
    //     return () => {
    //       if (videoURL) {
    //         URL.revokeObjectURL(videoURL);
    //       }
    //     };
    //   }, [videoURL]);
    const deleteUploadedVideo = (fileId) => {
      console.log(fileId)
      const updatedFilesList = files.filter((file) => file.id !== fileId);
      setFiles(updatedFilesList);
    }
    return (
      <>
        <Dropzone
            onChange={updateFiles}
            value={underUploadFiles}
            accept="video/*"
            maxFileSize={5 * 1024 * 1024 * 1024}
            maxFiles={1}
            multiple={false}
            autoClean
            uploadConfig={{ url: "https://www.myawsomeserver.com/upload" }}
            fakeUpload
            actionButtons={{
                position: "after",
                uploadButton: { style: { textTransform: "uppercase" } },
                abortButton: {},
                cleanButton: {},
                deleteButton: {},
            }}
            onUploadFinish={UploadFinish}
            footer={false}
            >
            {underUploadFiles.map((file) => (
            <FileCard key={file.id} {...file} onDelete={() => removeFile(file.id)} preview info />
            ))}
        </Dropzone>
        {files && <div className='cameraDisplay'>
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
          {/* <div><ReactPlayer url={videoURL} playing={true} loop={true} controls={true}  width="390px" height="300px" /></div>
          <div><ReactPlayer url={videoURL} playing={true} loop={true} controls={true}  width="390px" height="300px" /></div>
          <div><ReactPlayer url={videoURL} playing={true} loop={true} controls={true}  width="390px" height="300px" /></div>
          <div><ReactPlayer url={videoURL} playing={true} loop={true} controls={true}  width="390px" height="300px" /></div>
          <div><ReactPlayer url={videoURL} playing={true} loop={true} controls={true}  width="390px" height="300px" /></div> */}
        </div> }
      </>
    );
}

export default VideoPreview;
