import React, { useState, useEffect } from 'react';
import { Dropzone, FileCard } from '@files-ui/react';
import ReactPlayer from 'react-player'
// import videoURL from '../public/aahiltest1.mp4'
function VideoPreview() {
    const [files, setFiles] = useState([]);
    const [videoURL,setVideoURL] = useState(null)
    const updateFiles = (acceptedFiles) => {
        console.log(acceptedFiles[0].file)
        console.log(URL.createObjectURL(acceptedFiles[0].file))
        setVideoURL(URL.createObjectURL(acceptedFiles[0].file))
    };
    const removeFile = (fileId) => {
        const updatedFilesList = files.filter((file) => file.id !== fileId);
        setFiles(updatedFilesList);
    }
    useEffect(() => {
        return () => {
          if (videoURL) {
            URL.revokeObjectURL(videoURL);
          }
        };
      }, [videoURL]);
    return (
      <>
        <Dropzone
            onChange={updateFiles}
            value={files}
            accept="video/*"
            maxFileSize={5 * 1024 * 1024 * 1024}
            maxFiles={1}
            // cleanFiles
            actionButtons={{
                position: "after",
                uploadButton: { style: { textTransform: "uppercase" } },
                abortButton: {},
                cleanButton: {},
                deleteButton: {},
            }}
            fakeUpload
            footer={false}
            >
            {files.map((file) => (
            <FileCard key={file.id} {...file} onDelete={() => removeFile(file.id)} preview info />
            ))}
        </Dropzone>
        <ReactPlayer url={videoURL} playing={true} loop={true} controls={true}  width="100" height="100" />
      </>
    );
}

export default VideoPreview;
