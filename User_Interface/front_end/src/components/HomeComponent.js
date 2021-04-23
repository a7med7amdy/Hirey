import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { withRouter } from 'react-router-dom';
import VideoRecorder from 'react-video-recorder';
import {ZiggeoRecorder} from 'react-ziggeo'


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

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mt-10">
                    <br></br>
                    {/* <RecordVideo /> */}
                    <VideoRecorder 
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
                    />
                    {/* <ZiggeoRecorder
                        apiKey={API_KEY}
                        video={VIDEO_TOKEN}
                        height={180}
                        width={320}
                        onRecording={handleRecorderRecording}
                        onUploading={handleRecorderUploading}
                        // onRef={ref => (setRecorder(ref))}
                    /> */}
                </div>
                <Footer />
            </div>
        );
    }
}
export default withRouter(Home);