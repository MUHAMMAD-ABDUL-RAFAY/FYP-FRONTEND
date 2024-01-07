import React, { useState } from 'react';
import { Dropzone, FileCard } from '@files-ui/react'; 
import { saveVideo } from '../helper/helper';
// import { Toaster } from 'react-hot-toast';
function VideoUpload(props) {
  
  //useStates
  const [underUploadFiles,setUnderUploadFiles] = useState([])
  const [videoStatus,setVideoStatus] = useState(['','',''])
  


  const updateFiles = (acceptedFiles) => {
    const filesToRemove = new Set(underUploadFiles.map(obj => obj.key));
    acceptedFiles.filter(obj => !filesToRemove.has(obj.key));
    console.log(acceptedFiles)
    setUnderUploadFiles(acceptedFiles)
  };



  const UploadFinish = () => {
    // console.log("Upload Finished",underUploadFiles)
    // setFiles((prevFiles) => [...prevFiles,underUploadFiles[0]])
    console.log(underUploadFiles)
    props.UploadHandler(underUploadFiles)
  }


  const uploadFileToCloud = async (videoFile,i) => {
    // console.log('call')
    // console.log(videoFile)
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
      const resp = await saveVideo({videoname:videoFile.name,videolink:data?.secure_url})
      if(resp.data.status === 200)
      {
        setVideoStatus((prevStatus) => {
          return [...prevStatus.slice(0, i), 'success', ...prevStatus.slice(i + 1)];
        });
      }
    } catch (error) {
      setVideoStatus((prevStatus) => {
        return [...prevStatus.slice(0, i), 'error', ...prevStatus.slice(i + 1)];
      });
    }
  }



  const UploadStart = async () => {
    // console.log("upload started")    
    if(underUploadFiles){
      let size = underUploadFiles.length
      // console.log(size)
      // setVideoStatus((prevStatus) => prevStatus.map((status) => status = 'uploading'))
      setVideoStatus((prevStatus) => [
        ...prevStatus.slice(0, size).fill('uploading'),
        ...prevStatus.slice(size),
      ]);
      for (const [index,underUploadFile] of underUploadFiles.entries()){
        await uploadFileToCloud(underUploadFile,index)
      }
    }
  }



  const removeUnderUploadFile = (fileId) => {
    // console.log(fileId)
    const updatedFilesList = underUploadFiles.filter((file) => file.id !== fileId);
    setUnderUploadFiles(updatedFilesList);
  }



  return (
    <div className= "UploadPreview">
      {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}
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
