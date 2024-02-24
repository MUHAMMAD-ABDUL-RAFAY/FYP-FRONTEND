import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import WebcamOff from "./WebcamOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import io from "socket.io-client";
import { Typography, Slider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const LiveVideo = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [connect, setConnect] = useState(false);
  const socket = io("http://localhost:8000");
  const [model, setModel] = useState("shoplifting");

  useEffect(() => {
    console.log("hello");
    socket.on("connect", () => {
      console.log("Received message from server: ");
    });
  }, []);
  // socket.on('message', (data) => {
  //     console.log('Received message from server:', data);
  // });
  // Send messages to the server
  // socket.emit('message', 'Hello from the client!');
  // useEffect(() => {
  //     const startVideo = async () => {
  //         const toastId = toast.loading("Opening Camera")
  //         console.log('video started')
  //         try {
  //             const newStream = await navigator.mediaDevices.getUserMedia({ video: {width: { ideal: 1280 },
  //             height: { ideal: 720 }} });
  //             setStream(newStream);
  //             videoRef.current.srcObject = newStream;
  //             toast.dismiss(toastId)
  //             toast.success("Camera Opened")
  //         } catch (error) {
  //             toast.dismiss(toastId)
  //             toast.error("error in opening camera")
  //             setIsCameraOn(false)
  //             console.error(error);
  //         }
  //         };
  //         if(isCameraOn){
  //             startVideo(); // Start camera initially
  //         }

  // }, [isCameraOn]);
  const handleTurnOffCamera = () => {
    setIsCameraOn(false);
    stream.getTracks()[0].stop();
  };
  const handleTurnOnCamera = () => {
    setIsCameraOn(true);
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  const handleChange = (e, newValue) => {
    console.log(threshold);
    setThreshold(newValue);
  };

  const HandleConn = async (val) => {
    let toastId;
    val ? (toastId = toast.loading("Setting Up Model")) : "";
    console.log("hello");
    setIsCameraOn(val);
    setConnect(val);
    if (val === false) {
      socket.emit("terminate");
    }
    socket.on("videostart", (data) => {
      console.log("data");
      toast.dismiss(toastId);
      toast.success("Video Started");
      // setIsCameraOn(val)
    });
    // socket.on('videostart', (data) => {
    //     console.log('received data', data)
    // })
    // axios.defaults.baseURL = 'http://127.0.0.1:5000'
    // const frame = await axios.get('/api/livevideo')
    // console.log(frame)
    // const source = url_for("/api/livevideo")
    // console.log(source)
    // videoRef.current.srcObject = source;
  };
  const [threshold, setThreshold] = useState(40);
  return (
    <div>
      <div
        className="h-full flex"
        style={{ margin: "1rem 1rem 1rem 1rem", columnGap: "1rem" }}
      >
        {isCameraOn ? (
          <img src={connect ? `http://127.0.0.1:8000/api/livevideo/${model}/${threshold}` : ""} />
        ) : (
          <WebcamOff />
        )}
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
          <InputLabel className="mb-1" id="demo-simple-select-label">
            {" "}
            Select Model
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={model}
            label="Select Model"
            onChange={handleModelChange}
          >
            <MenuItem value={"shoplifting"}>Shoplifting Model</MenuItem>
            <MenuItem value={"robbery"}>Robbery Model</MenuItem>
          </Select>
          {/* <div>
            <Typography>{anamoly}</Typography>
            <p>{coordinates}</p>
          </div> */}
        </div>

        {/* <Webcam className='sm:h-[30vh]' mirrored={true} style={{display:'inline', height:'60vh'}}/> */}
      </div>
      <div className="flex flex-row justify-center" style={{columnGap:"1rem"}}>
      <Button
        variant="contained"
        startIcon={isCameraOn ? <VideocamOffIcon /> : <VideocamIcon />}
        onClick={isCameraOn ? handleTurnOffCamera : handleTurnOnCamera}
      >
        {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
      </Button>
      {connect ? (
        <Button
          variant="contained"
          style={{ backgroundColor: "#CC0000", color: "#fff" }}
          onClick={() => HandleConn(false)}
        >
          Stop
        </Button>
      ) : (
        <Button variant="contained" onClick={() => HandleConn(true)}>
          Start
        </Button>
      )}
      </div>
    </div>
  );
};

export default LiveVideo;
