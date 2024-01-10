import { Button } from '@mui/material';
import React,{useState,useEffect,useRef} from 'react'
import Webcam from 'react-webcam'
import WebcamOff from './WebcamOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import toast from 'react-hot-toast';
import io from 'socket.io-client'



const LiveVideo = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [socketInstance,setSocketInstance] = useState(null)
    // useEffect(() => {   
        
        // socket.on('response', (prediction) => {
        //   // Handle received prediction from backend
        //   console.log('Received prediction:', prediction);
        // });
    
        // const sendStreamData = async () => {
        //   try {
        //     const mediaRecorder = new MediaRecorder(stream);
        //     mediaRecorder.start();
    
        //     mediaRecorder.addEventListener('dataavailable', (event) => {
        //       socket.emit('stream-data', event.data);
        //     });
        //   } catch (error) {
        //     console.error('Error sending stream:', error);
        //     // Handle error and potentially retry
        //   }
        // };
    
        // sendStreamData();
    //   }, []);



    useEffect(() => {
        console.log('useeffect called')
        const startVideo = async () => {
            const toastId = toast.loading("Opening Camera")
            console.log('video started')
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({ video: {width: { ideal: 1280 },
                height: { ideal: 720 }} });
                setStream(newStream);
                videoRef.current.srcObject = newStream;
                toast.dismiss(toastId)
                toast.success("Camera Opened")
            } catch (error) {
                toast.dismiss(toastId)
                toast.error("error in opening camera")
                setIsCameraOn(false)
                console.error(error);
            }
            };
            if(isCameraOn){
                startVideo(); // Start camera initially
            }
                
    }, [isCameraOn]);
    const handleTurnOffCamera = () => {
        setIsCameraOn(false)
        stream.getTracks()[0].stop()
    }
    const handleTurnOnCamera = () => {
        setIsCameraOn(true)
    }

    const [messages,setMessages] = useState([])
    // useEffect(() => {
    //     socketInstance.on("data", (data) => {
    //       setMessages([...messages, data.data]);
    //     });
    //   }, [socketInstance, messages]);

    const HandleConn = () => {
        console.log('hello')
        const socket = io('localhost:5000/',{
            transports: ['websocket'],
            cors: {
                origin: 'http://localhost:5173/'
            }
        })
        
        setSocketInstance(socket)
        console.log("hee",socket)
        console.log("hoo",socketInstance)
        socket.on("connect", (data) => {
            console.log("data:",data.data);
        });
    }



    return (
        <div>
            <div className='h-full' style={{margin:'1rem 1rem 1rem 1rem'}}>
                {isCameraOn ? <Webcam className='sm:h-[30vh]' ref={videoRef} mirrored={true} style={{display:'inline', height:'60vh'}}/> : <WebcamOff />}
            </div>
            <Button variant='contained' startIcon={isCameraOn ? <VideocamOffIcon /> : <VideocamIcon />} onClick={isCameraOn ? handleTurnOffCamera : handleTurnOnCamera}>{isCameraOn ? 'Turn Off Camera': 'Turn On Camera'}</Button>
            <Button variant='contained' onClick={HandleConn}>Start</Button>
        </div>
    )
}

export default LiveVideo