import React, { useState, useEffect } from 'react';
import { Dropzone, FileCard } from '@files-ui/react';
// import ReactPlayer from 'react-player'
// import { Button } from '@mui/material';

// import videoURL from '../public/aahiltest1.mp4'
function VideoUpload(props) {
    const [underUploadFiles,setUnderUploadFiles] = useState([])
    // const [videoURL,setVideoURL] = useState([])
    // console.log(files)
    // console.log(videoURL)
    const updateFiles = (acceptedFiles) => {
      console.log("update",acceptedFiles)
      // console.log("accepted: ",acceptedFiles)
      // console.log(acceptedFiles[0].file)
      // console.log(URL.createObjectURL(acceptedFiles[0].file))
      setUnderUploadFiles(acceptedFiles)
      // setFiles((prevFiles) => [...prevFiles,acceptedFiles[0]])
      // setVideoURL((prevURLs) => [...prevURLs,URL.createObjectURL(acceptedFiles[0].file)])
    };
    const UploadFinish = () => {
      console.log("Upload Finished",underUploadFiles)
      // setFiles((prevFiles) => [...prevFiles,underUploadFiles[0]])
      props.UploadHandler(underUploadFiles)
    }
    const removeUnderUploadFile = (fileId) => {
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
    return (
      <div className= "UploadPreview">
        <Dropzone
            onChange={updateFiles}
            value={underUploadFiles}
            accept="video/*"
            maxFileSize={5 * 1024 * 1024 * 1024}
            maxFiles={3}
            // multiple={false}
            autoClean
            uploadConfig={{ url: "https://www.myawsomeserver.com/upload" }}
            fakeUpload
            actionButtons={{
                position: "after",
                uploadButton: {},  //style: { textTransform: "uppercase" } 
                abortButton: {},
                cleanButton: {},
                deleteButton: {},
            }}
            onUploadFinish={UploadFinish}
            footer={false}
            >
            {underUploadFiles.map((file) => (
            <FileCard key={file.id} {...file} onDelete={() => removeUnderUploadFile(file.id)} preview info />
            ))}
        </Dropzone>
        
      </div>
    );
}

export default VideoUpload;
