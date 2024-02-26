import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button, Slider, Typography } from "@mui/material";
import { io } from "socket.io-client";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import toast from "react-hot-toast";

const AnalyzeVideo = () => {
  const location = useLocation();
  const video = location.state?.video;
  const [threshold, setThreshold] = useState(40);
  const [isPredicting, setIsPredicting] = useState(false);
  const [videoParam1, setVideoParam1] = useState("");
  const [videoParam2, setVideoParam2] = useState("");
  const [socket,setSocket] = useState(null)
  const [anamoly,setAnamoly] = useState('')
  const [coordinates,setCoordinates] = useState(null)
  useEffect(() => {
    console.log("effect")
    const skt = io("http://localhost:8000");
    setSocket(skt);
    // socket.on("connect", () => {
    //   console.log("Received message from server: ");
    // });
    console.log(video);
    const videoLinkParams = video.videolink.split("/");
    setVideoParam1(videoLinkParams[6]);
    setVideoParam2(videoLinkParams[7]);
    console.log(videoParam1, videoParam2);

    return () => {
        if(socket)
            socket.disconnect()}
  }, []);

  const handleChange = (e, newValue) => {
    console.log(threshold);
    setThreshold(newValue);
  };
  const handleStart = () => {
    console.log("Start");
    let toastId;
    toastId = toast.loading("Setting Up Model");
    setIsPredicting(true);
    
    socket.on("videostart", (data) => {
      console.log("data");
      toast.dismiss(toastId);
      toast.success("Video Started");
      // setIsCameraOn(val)
      // setIsPredicting(true)
    });

  };
  socket?.on("Anamoly", ({Class,Coordinates}) => {
    setAnamoly(Class)
    setCoordinates(Coordinates)
    console.log(Coordinates)
  });
  socket?.on('videocomplete',() => {
        setIsPredicting(false)
  })
  const handleStop = () => {
    console.log("Stop");
    setIsPredicting(false)
    socket.emit('terminate')
  };
  const [model,setModel] = useState('shoplifting')
  const handleModelChange = (event) => {
    setModel(event.target.value)
  }
  return (
    <>
      <div className="flex justify-around px-8 gap-x-20 mt-10">
        <div style={{ width: "70%" }}>
          {isPredicting ? (
            <img
              src={`http://127.0.0.1:8000/api/analyzevideo/${model}/${threshold}/${videoParam1}/${videoParam2}`}
              alt="video"
            />
          ) : (
            <ReactPlayer
              key={video._id}
              url={video.videolink}
              playing={true}
              loop={true}
              controls={true}
              width="100%"
              height="300px"
            />
          )}
        </div>
        <div className="self-center" style={{ width: "30%" }}>
          <Typography id="non-linear-slider" gutterBottom>
            Threshold: {threshold}%
          </Typography>
          <Slider
            size="medium"
            value={threshold}
            min={0}
            step={1}
            max={100}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <InputLabel className="mb-1" id="demo-simple-select-label"> Select Model</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={model}
            label="Select Model"
            onChange={handleModelChange}
          >
            <MenuItem value={"shoplifting"}>Shoplifting Model</MenuItem>
            <MenuItem value={'robbery'}>Robbery Model</MenuItem>
          </Select>
          {/* <div>
            <Typography>{anamoly}</Typography>
            <p>{coordinates}</p>
          </div> */}
        </div>
      </div>
      <div className="flex flex-row justify-center gap-x-8 mt-8">
        {isPredicting ? (
          <Button style={{ backgroundColor: "#CC0000", color: "#fff" }} variant="contained" onClick={handleStop}>
            Stop
          </Button>
        ) : (
          <Button variant="contained" onClick={handleStart}>
            Start
          </Button>
        )}
      </div>
    </>
  );
};

export default AnalyzeVideo;
