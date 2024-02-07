import { Button } from '@mui/material';
import React,{useState,useEffect,useRef} from 'react'
import Webcam from 'react-webcam'
import WebcamOff from './WebcamOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import toast from 'react-hot-toast';
import axios from 'axios';


const LiveVideo = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [connect,setConnect] = useState(false)
    

    
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
        setIsCameraOn(false)
        stream.getTracks()[0].stop()
    }
    const handleTurnOnCamera = () => {
        setIsCameraOn(true)
    }


    const HandleConn = async () => {
        console.log('hello')
        setIsCameraOn(true)
        setConnect(true)
        // axios.defaults.baseURL = 'http://127.0.0.1:5000'
        // const frame = await axios.get('/api/livevideo')
        // console.log(frame)
        // const source = url_for("/api/livevideo")
        // console.log(source)
        // videoRef.current.srcObject = source;
    }

    return (
        <div>
            <div className='h-full' style={{margin:'1rem 1rem 1rem 1rem'}}>
            {isCameraOn ?  <img src={connect ? 'http://127.0.0.1:5000/api/livevideo' : ''} alt="video" /> : <WebcamOff />}
            
                {/* <Webcam className='sm:h-[30vh]' mirrored={true} style={{display:'inline', height:'60vh'}}/> */}
            </div>
            <Button variant='contained' startIcon={isCameraOn ? <VideocamOffIcon /> : <VideocamIcon />} onClick={isCameraOn ? handleTurnOffCamera : handleTurnOnCamera}>{isCameraOn ? 'Turn Off Camera': 'Turn On Camera'}</Button>
            <Button variant='contained' onClick={HandleConn}>Start</Button>
        </div>
    )
}

export default LiveVideo