import React from 'react';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import axios from 'axios';
import 'videojs-record/dist/css/videojs.record.css';

class Video extends React.Component {
   state = { video:null,start:false,good:0,medium:0,bad:0};
    constructor(props) {
      super(props);
      this.streamCamVideo= this.streamCamVideo.bind(this);
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.takephoto(), 10000);
      }

      takephoto=()=>{
        if(this.state.start === true){
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', 1280);
            canvas.setAttribute('height', 720);
            var context = canvas.getContext('2d');
            context.drawImage(this.state.video, 0, 0, 1280, 720);
    
            var data = canvas.toDataURL('image/jpeg',0.8);
            var photo = document.createElement('photo');
            photo.setAttribute('src', data);
            const headers = {
                'image': photo,
            };
            var bodyFormData = new FormData();
            bodyFormData.append('image', data); 
            axios({
              method: "post",
              url: "http://b242d8cf1c26.ngrok.io/predict",
              data: bodyFormData,
              
              headers: {'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`},
            })
              .then((response)=> {
                //handle success
                console.log(response.data);
                if(response.data === "good ")
                  this.setState({good:this.state.good + 1});
                else if (response.data === "bad ")
                  this.setState({bad:this.state.bad + 1});
                else
                  this.setState({medium:this.state.medium + 1});


                console.log("good",this.state.good);
                console.log("bad",this.state.bad);
                console.log("medium",this.state.medium);
              })
              .catch(function (response) {
                //handle error
                console.log(response);
              });
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
             var context = canvas.getContext('2d');
             context.drawImage(video, 0, 0, 1280, 720);
      
             var data = canvas.toDataURL('image/png');
             photo.setAttribute('src', data);
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
}

  export default Video;


  