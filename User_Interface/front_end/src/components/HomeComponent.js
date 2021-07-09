import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Video from './VideoComponent';
import { withRouter } from 'react-router-dom';
import SpeechRec from './SpeechRec';

// import VideoRecorder from 'react-video-recorder';
// import { ReactMediaRecorder } from "react-media-recorder";
// import {ZiggeoRecorder} from 'react-ziggeo'
// import Webcam from "react-webcam";

// import { RecordWebcam, useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
// function RecordVideo(props) {
//   const recordWebcam = useRecordWebcam({recordingLength:60});
//   const saveFile = async () => {
//     const blob = await recordWebcam.getRecording();
//     // ...
//   };
//   return (
//     <RecordWebcam isWebcamOn={true}
//       // render={(props: WebcamRenderProps) => {
//       //   return (
//       //     <div>
//       //       <h1>Component render prop demo</h1>
//       //       <p>Camera status: {props.status}</p>
//       //       <div>
//       //         <button onClick={props.openCamera}>Open camera</button>
//       //         <button onClick={props.retake}>Retake</button>
//       //         <button onClick={props.start}>Start recording</button>
//       //         <button onClick={props.stop}>Stop recording</button>
//       //         <button onClick={props.download}>Download</button>
//       //       </div>
//       //     </div>
//       //   );
//       // }}
//     />
//   )
// }
// const [recorder, setRecorder] = useState(null);
// useEffect(() => {
//     if (recorder) {
//         // DO stuff here
//         recorder.on("any_event", function (rec) {  }, recorder);
//         recorder.get("attribute_name");
//     }
// }, [recorder]);

// Embedding (player/recorder instance) will be the first argument
// const handleRecorderRecording = (embedding) => {
//     console.log('Recorder onRecording');
// };

// const handleRecorderUploading = (embedding) => {
//     console.log('Recorder uploading');
// };


// const videoJsOptions = {
//   controls: true,
//   bigPlayButton: false,
//   fluid: true,
//   width: 120,
//   height: 120,
//   aspectRatio: '3:1',
//   autorecord: true,
//   plugins: {
//       /*
//       // wavesurfer section is only needed when recording audio-only
//       wavesurfer: {
//           backend: 'WebAudio',
//           waveColor: '#36393b',
//           progressColor: 'black',
//           debug: true,
//           cursorWidth: 1,
//           msDisplayMax: 20,
//           hideScrollbar: true,
//           displayMilliseconds: true,
//           plugins: [
//               // enable microphone plugin
//               WaveSurfer.microphone.create({
//                   bufferSize: 4096,
//                   numberOfInputChannels: 1,
//                   numberOfOutputChannels: 1,
//                   constraints: {
//                       video: false,
//                       audio: true
//                   }
//               })
//           ]
//       },
//       */
//       record: {
//           audio: true,
//           video: true,
//           maxLength: 20,
//           debug: true,
//       }
//   }
// };

class Home extends Component {
  // componentDidMount () {
  //   const script = document.createElement("script");
  //   script.src = "./index.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }
    render() {
        return (
            <div>
                <Header />             
                    <br></br>
                    <div id="mydiv">                 
                        {/* <Video { ...videoJsOptions }/> */}
                        <SpeechRec/> 
                    </div>
                    {/* <RecordVideo /> */}
                   { /*<ReactMediaRecorder
                          video
                          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                            <div>
                              <p>{status}</p>
                              <button onClick={startRecording}>Start Recording</button>
                              <button onClick={stopRecording}>Stop Recording</button>
                              <video src={mediaBlobUrl} controls autoplay loop />
                            </div>
                          )}
                        />
                          */}
                {  /*  <VideoRecorder 
                      height={180}
                      width={320}
                      style = {{width:'100'}}
                      chunkSize={50}
                      constraints={{
                        audio: true,
                        video: true
                      }}
                      // isOnInitially
                      // timeLimit={1}
                      onRecordingComplete={videoBlob => {
                        // Do something with the video...
                        console.log('videoBlob', videoBlob)
                
                      }}
                      replayVideoAutoplayAndLoopOff
                      showReplayControls
                    />*/
    }
                    {/* <ZiggeoRecorder
                        apiKey={API_KEY}
                        video={VIDEO_TOKEN}
                        height={180}
                        width={320}
                        onRecording={handleRecorderRecording}
                        onUploading={handleRecorderUploading}
                        // onRef={ref => (setRecorder(ref))}
                    /> */}
                    <br></br>
                <Footer />
            </div>
        );
    }
}
export default withRouter(Home);