import React, { Component } from 'react';
import { useState, useEffect } from "react";
// import AudioAnalyser from './AudioAnalyser';

// class Mic extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       audio: null
//     };
//     this.toggleMicrophone = this.toggleMicrophone.bind(this);
//   }

//   async getMicrophone() {
//     const audio = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: false
//     });
//     this.setState({ audio });
//   }

//   stopMicrophone() {
//     this.state.audio.getTracks().forEach(track => track.stop());
//     this.setState({ audio: null });
//   }

//   toggleMicrophone() {
//     if (this.state.audio) {
//       this.stopMicrophone();
//     } else {
//       this.getMicrophone();
//     }
//   }

//   render() {
//     return (
//       <div className="App">
//         <div className="controls">
//           <button onClick={this.toggleMicrophone}>
//             {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
//           </button>
//         </div>
//         {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
//       </div>
//     );
//   }
// }

// import { ReactMic } from 'react-mic';
import axios from 'axios';
// export class Mic extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       record: false,
//       blurl : ''
//     }
//     this.onStop = this.onStop.bind(this);
//     this.audio = new Audio(this.state.blurl)
//   }
//    startRecording = () =>  {
//     const audio = navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: false
//     });

//     audio.then((stream) => {
//         alert('accepted the permissions');
//         this.setState({ record: audio });
//     })
//   }
 
//   stopRecording = () => {
//     this.setState({ record: false });
//   }
 
//   onData(recordedBlob) {
    
//     console.log('chunk of real-time data is: ', recordedBlob);

//   }

//   sendAudioFile = (url) => {
//     let data = new FormData();
//     data.append("file", url);
//     axios({
//         method: "post",
//         url: "http://fcd6236db59f.ngrok.io/predictVoice",
//         data: data,
        
//         headers: {'Content-Type': `multipart/form-data; boundary=${data._boundary}`},
//       })
//       .then((res) => {
//         console.log(res);
//         return res;
//       });
//     }
//     saveRecording = (recordingName) => {
//         var a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         var blob = FWRecorder.getBlob(recordingName),
//             url = window.URL.createObjectURL(blob);
//         a.href = url;
//         a.download = 'recordingName' + '-fwr-recording.wav';
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//     };
//   onStop(recordedBlob) {

//     console.log('recordedBlob is: ', recordedBlob);
//     // var aud = document.createElement('ReactPlayer');
//     var url = recordedBlob.blobURL;
//     url = url.split("b:").pop();
//     // aud.setAttribute('src', url);
    
//     this.setState({ blurl: url });
//     console.log('shittooon', this.state.blurl);
//     this.saveRecording(this.state.blurl);
//     this.sendAudioFile('audio');
//     // this.audio.play()
//   }

//   render() {
//     return (
//       <div>
//         <ReactMic
//           record={this.state.record}
//           className="sound-wave"
//           onStop={this.onStop}
//           onData={this.onData}
//           strokeColor="#000000"
//           backgroundColor="#FF4081" />
//         <button onClick={this.startRecording} type="button">Start</button>
//         <button onClick={this.stopRecording} type="button">Stop</button>
//       </div>
      
//     );
//   }
// }

// export default Mic;


// import React from 'react';
// import Bird from "./sounds/birds.mp3"
const audioType = 'audio/*';

class RecordingAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
    };
  }

  async componentDidMount() {
    
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    
    // show it to user
    // this.audio.src = window.URL.createObjectURL(stream);
    if ('srcObject' in this) {
      try {
        this.srcObject = stream;
      } catch (err) {
        if (err.name != "TypeError") {
          throw err;
        }
        // Even if they do, they may only support MediaStream
        this.audio.src = URL.createObjectURL(stream);
       }
      } else {
        this.audio.src = URL.createObjectURL(new Blob([stream], {type: audioType}));
      }
    this.audio.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream);
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };

    // this.interval = setInterval(() => this.saveAudio(), 5000);
  }

  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    // if(this.state.recording === true){
      this.mediaRecorder.stop();
      // say that we're not recording
      this.setState({recording: false});
      // save the video to memory
      this.saveAudio();    
  }
  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: audioType});
    // this.chunks = [];
    console.log(blob);
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // // append videoURL to list of saved videos for rendering
    // const audios = this.state.audios.concat([audioURL]);
    // this.setState({audios});

    // ------------------->this to download and then send AUDIO
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = audioURL;
    a.download = 'recordingName' + '-fwr-recording.wav';
    a.click();
    window.URL.revokeObjectURL(audioURL);
    document.body.removeChild(a);

    let data = new FormData();
    data.append("file/wav", a);
    axios({
        method: "post",
        url: "http://c3952a5b24d5.ngrok.io/predictVoice",
        data: data,
        
        headers: {'Content-Type': `multipart/form-data; boundary=${data._boundary}`},
      })
      .then((res) => {
        console.log(res);
        return res;
      });
  }

  deleteAudio(audioURL) {
    // filter out current videoURL from the list of saved videos
    const audios = this.state.audios.filter(a => a !== audioURL);
    this.setState({audios});
  }

  render() {
    const {recording, audios} = this.state;

    return (
      <div className="camera">
        <audio


          style={{width: 400}}
          ref={a => {
            this.audio = a;
          }}>
         <p>Audio stream not available. </p>
        </audio>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        {/* <div>
          <h3>Recorded audios:</h3>
          {audios.map((audioURL, i) => (
            <div key={`audio_${i}`}>
              <audio controls style={{width: 200}} src={audioURL}   />
              <div>
                <button onClick={() => this.deleteAudio(audioURL)}>Delete</button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}
export default RecordingAPI