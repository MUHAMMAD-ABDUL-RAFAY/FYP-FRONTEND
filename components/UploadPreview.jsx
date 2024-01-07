import React, { useState } from 'react';
import { Dropzone, FileCard, uploadFormData } from '@files-ui/react';
// import ReactPlayer from 'react-player'
// import { Button } from '@mui/material';

// import videoURL from '../public/aahiltest1.mp4'
function VideoUpload(props) {
    const [underUploadFiles,setUnderUploadFiles] = useState([])
    const [videoStatus,setVideoStatus] = useState(['','',''])
    // const [videoURL,setVideoURL] = useState([])
    // console.log(files)
    // console.log(videoURL)
    const updateFiles = (acceptedFiles) => {
      // console.log("update",acceptedFiles)
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
    console.log(videoStatus)
    const uploadFileToCloud = async (videoFile,i) => {
      console.log('call')
      const formData = new FormData()
      formData.append('file',videoFile.file)
      formData.append('upload_preset',"vtgp88wg")
      try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/dxkxrii3x/video/upload`,{
          method: "POST",
          body: formData
        })
        const data = await res.json()
        console.log("i",i,data?.secure_url)
        setVideoStatus((prevStatus) => {
          return [...prevStatus.slice(0, i), 'success', ...prevStatus.slice(i + 1)];
        });
        // const uploadStatus = [...videoStatus]
        // uploadStatus[i] = 'success'
        // setVideoStatus((prev) => prev[i] = 'success')
      
      } catch (error) {
        setVideoStatus((prevStatus) => {
          return [...prevStatus.slice(0, i), 'error', ...prevStatus.slice(i + 1)];
        });
        // const data = await res.json()
        // const uploadStatus = [...videoStatus]
        // uploadStatus[i] = 'success'
        // setVideoStatus((prev) => prev[i] = 'success')
      }
      
      // .then(async (res) => {
      //   const data = await res.json()
      //   console.log("i",i,data?.secure_url)
      //   const uploadStatus = [...videoStatus]
      //   uploadStatus[i] = 'success'
      //   setVideoStatus(uploadStatus)
      // })
      // .catch((err) => {
        
      //   uploadStatus[i] = 'error'
      //   setVideoStatus(uploadStatus)
      //   console.log(err)
      // })
      // .finally(() => {
      //   console.log(uploadStatus)
      // })
    }
    const UploadStart = async () => {
      console.log("upload started")
      
      if(underUploadFiles){
        let size = underUploadFiles.length
        console.log(size)
        // setVideoStatus((prevStatus) => prevStatus.map((status) => status = 'uploading'))
        setVideoStatus((prevStatus) => [
          ...prevStatus.slice(0, size).fill('uploading'),
          ...prevStatus.slice(size),
        ]);
        for (const [index,underUploadFile] of underUploadFiles.entries()){
          console.log(index)
          await uploadFileToCloud(underUploadFile,index)
        }
      }
    }
    const removeUnderUploadFile = (fileId) => {
      console.log(fileId)
      const updatedFilesList = underUploadFiles.filter((file) => file.id !== fileId);
      setUnderUploadFiles(updatedFilesList);
    }
    // const UploadHandler = () => {
    //   console.log("Upload Handler")
    // }
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
            uploadConfig={{
              url:`https://api.cloudinary.com/v1_1/dxkxrii3x/image/upload`,
              method: "POST",
            }}
            // fakeUpload
            actionButtons={{
                position: "after",
                uploadButton: {},  //style: { textTransform: "uppercase" } 
                abortButton: {},
                cleanButton: {},
                deleteButton: {},
            }}
            onUploadStart={UploadStart}
            onUploadFinish={UploadFinish}
            footer={false}
            >
            {underUploadFiles.map((file,index) => (
            <FileCard key={file.id} {...file} uploadStatus={videoStatus[index]} onDelete={() => removeUnderUploadFile(file.id)} preview info />
            ))}
        </Dropzone>
        
      </div>
    );
}

export default VideoUpload;
