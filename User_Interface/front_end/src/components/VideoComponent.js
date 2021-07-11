import React, { Component } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';
import axios from 'axios';





/*
// Required imports when recording audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
*/

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

// function Test()
// {
//     const { transcript, resetTranscript } = useSpeechRecognition();
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true});
//     setTimeout( function() {
//         SpeechRecognition.stopListening();
//         console.log("Result" + transcript);
//     }, 20000)
// }

/*
class Video extends Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, () => {
            // print version information at startup
            const version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(version_info);
        });
        // this.player.record().getDevice();
        // this.player.record().start();
        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');  
            this.props.Test(); 
        });
            
        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
           // this.player.record().saveAs({'video': 'audio.mp4'}, 'convert');
            var path = document.location.pathname;
            var directory = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
            console.log(directory);
            this.player.record().saveAs({'video': 'my-audio-file.mp3'});
            //this.player.record().saveAs({'video': 'my-video-file-name.mp4'}, 'convert');
            console.log('finished recording: ', this.player.recordedData);
        });

        // error handling
        this.player.on('error', (element, error) => {
            console.warn(error);
        });

        this.player.on('deviceError', () => {
            console.error('device error:', this.player.deviceErrorCode);
        });
    }
    
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
    render() {
        return (
            <div data-vjs-player>
                <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
            </div>
        );
    }
}
export default Video;*/

/*class Video extends Component {
    state = { videoSrc: null }
    componentDidMount(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        }
    };

    handleVideo=(stream)=>{
        // Update the state, triggering the component to re-render with the correct stream
        this.setState({ videoSrc: window.URL.createObjectURL(stream) });
    }
    render() { 
        return ( <div>
            <video src={this.state.videoSrc} autoPlay="true" />
          </div> );
    }
}
 
export default Video;*/


class Video extends React.Component {
   state = { video:null,start:false };
    constructor(props) {
      super(props);
      this.streamCamVideo= this.streamCamVideo.bind(this);
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.takephoto(), 1);
      }

      takephoto=()=>{
        if(this.state.start === true){
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', 1280);
            canvas.setAttribute('height', 720);
            console.log("hiiii");
            var context = canvas.getContext('2d');
            context.drawImage(this.state.video, 0, 0, 1280, 720);
    
            var data = canvas.toDataURL('image/png');
            var photo = document.createElement('photo');
            photo.setAttribute('src', data);
            console.log("fuck the photo ",photo);

            const headers = {
                'image': photo,
            };
            var bodyFormData = new FormData();
            bodyFormData.append('image', data); 
            axios({
              method: "post",
              url: "http://b7a715bd2ef3.ngrok.io/predict",
              data: bodyFormData,
              
              headers: {'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`},
            })
              .then(function (response) {
                //handle success
                console.log(response);
              })
              .catch(function (response) {
                //handle error
                console.log(response);
              });
         //axios.post('http://daa51f58c228.ngrok.io/predict',{
         //  data : { 
         //   image: photo
        //}
        //})
        //.then(response => {
           /* this.setState({text: response.data},()=>{
                    this.setState({done:true});
            });*/
          //  console.log(response)
        //})
        //.catch(function(error) {
        //    console.log(error);
        //});


        }
      }
    streamCamVideo() {
      var constraints = { audio: true, video: { width: 1280, height: 720 } };
      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream)=> {
          var video = document.querySelector("video");
          var canvas = document.createElement('canvas');
          canvas.setAttribute('width', 1280);
          canvas.setAttribute('height', 720);
         var photo = document.createElement('photo');
         
          video.srcObject = mediaStream;
          video.onloadedmetadata = (e)=> {
            video.play();
            this.setState({start : true})
            this.setState({video : video})

            canvas.width = 1280;
             canvas.height = 720;
             console.log("hiiii");
             var context = canvas.getContext('2d');
             context.drawImage(video, 0, 0, 1280, 720);
      
             var data = canvas.toDataURL('image/png');
             photo.setAttribute('src', data);
             console.log(photo);
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        }); // always check for errors at the end.
}
    render() {
      return (
        <div>
          <div id="container">
            <video autoPlay={true} id="videoElement" controls></video>
          </div>
          <br/>
          <button onClick={this.streamCamVideo}>Start streaming</button>
        </div>
      );
    }


/*
function() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
  
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream
  
    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
  
    var streaming = false;
  
    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.
  
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
  
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');
  
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
        
          if (isNaN(height)) {
            height = width / (4/3);
          }
        
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
      startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);
      
      clearphoto();
    }
  
    // Fill the photo with an indication that none has been
    // captured.
  
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }
    
    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.
  
    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
  
    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
  };

  render() {
    return (
    //   <div>
    //     <div id="container">
    //       <video autoPlay={true} id="videoElement" controls></video>
    //     </div>
    //     <br/>
    //     <button onClick={this.streamCamVideo}>Start streaming</button>
    //   </div>

    <div>
        <script src="capture.js"></script>
        <div className="camera">
            <video id="video">Video stream not available.</video>
            <button onClick={this.function} id="startbutton">Take photo</button>
        </div>
        <canvas id="canvas"></canvas>
        <div className="output"> <img id="photo" alt="The screen capture will appear in this box."></img> </div>
    </div>
    );
  }*/
}

  export default Video;


  