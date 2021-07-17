import React ,{ useEffect, useState }from 'react';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import axios from 'axios';
import 'videojs-record/dist/css/videojs.record.css';
import Header from './HeaderComponent';
import { Carousel } from "react-bootstrap";
import image3 from "../Hirey.png";
import image2 from "../1.jpg";
import image1 from "../2.png";

import { useTimer } from 'react-timer-hook';
import Recvoice from "./VoiceRecording";

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    restart
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  function set()
  {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3);
    restart(time)
  }
  return (
    <div style={{display:"inline-block", position:'absolute', left:'80%', bottom:"40%"}}>
      <h1 style={{color:'blue', textAlign:"center"}}> Be Ready  </h1>
      <div style={{fontSize: '80px', textAlign:"center"}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {seconds === 0 ? <p style={{fontSize:35, color:'blue', fontWeight:'bold'}}> Start Answering </p> : null}
    </div>
  );
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-45 m-auto"
          src={image1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-40 m-auto"
          src={image2}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-40 m-auto"
          src={image3}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  );
}


const audioType = 'audio/*';

class Video extends React.Component {
   state = { video:null,start:false,good:0,medium:0,bad:0,data:[],showQuestion:false,mx:0,idx:0,mediaStream:null,mediaStream2:null,startAnswering:false, recording: false,
    audios: [],showQuestionButton:true};
    constructor(props) {
      super(props);
      this.streamCamVideo = this.streamCamVideo.bind(this);
    }

    async componentDidMount() {
        this.interval = setInterval(() => this.takephoto(), 10000);
        this.setState({data:this.props.location.state.data});
        this.setState({mx:this.props.location.state.data.length});

        
      }

      countDown = ()=>{
          setTimeout( ()=>{
            this.setState({showQuestionButton:true});
            //alert("GOOOO!!!");
            this.setState({startAnswering:true});
            ///////////////////////////////////
        navigator.mediaDevices.getUserMedia({audio: true}).then((mediaStream)=> {
          this.setState({mediaStream2:mediaStream})
        // show it to user
        // this.audio.src = window.URL.createObjectURL(stream);
        if ('srcObject' in this) {
          try {
            this.srcObject = mediaStream;
          } catch (err) {
            if (err.name != "TypeError") {
              throw err;
            }
            // Even if they do, they may only support MediaStream
            this.audio.src = URL.createObjectURL(mediaStream);
           }
          } else {
            this.audio.src = URL.createObjectURL(new Blob([mediaStream], {type: audioType}));
          }
        this.audio.play();
        console.log(mediaStream);
        // init recording
        this.mediaRecorder = new MediaRecorder(mediaStream);
        // init data storage for video chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
          }
        };
            /////////////////////////////////////
            this.startRecording()
      });
          }, 30000);
      }

      takeQuestion = ()=>{
        console.log("qqq")
        this.setState({showQuestionButton:false});
        if(this.state.idx>0){
          this.stopRecording()
          this.state.mediaStream2.getAudioTracks()[0].stop();
        }
        this.setState({startAnswering:false});
        console.log(this.state.idx);
        this.setState({showQuestion:true},()=>{
          if(this.state.idx <= this.state.mx){
            var msg = new SpeechSynthesisUtterance();
            msg.text = this.state.data[this.state.idx - 1].question;
            console.log(this.state.data[this.state.idx - 1].question)
            window.speechSynthesis.speak(msg);
          }
        });
        this.setState({idx:this.state.idx+1});
        if(this.state.idx !== this.state.mx)
          this.countDown();
        if(this.state.idx === this.state.mx){
          this.setState({showQuestion:false},()=>{
              console.log(this.state.showQuestion);
              this.setState({start:false});
          });
          console.log("hiiii");
          this.state.mediaStream2.getAudioTracks()[0].stop();
          this.state.mediaStream.getVideoTracks()[0].stop();
          
          // TODO
          //redirect to statistic page
          //this.props.history.push({pathname:"/"});
        }
      }


      takephoto=()=>{
        if(this.state.start === true && this.state.startAnswering === true){
            console.log("i'm evaluating!!!");
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
              url: "http://b90f643f4f25.ngrok.io/predict",
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
      this.setState({start : true})
      var constraints = { audio: false, video: { width: 1280, height: 720 } };
      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream)=> {
        console.log(mediaStream)
        this.setState({mediaStream:mediaStream})
          var video = document.querySelector("video");
          var canvas = document.createElement('canvas');
          canvas.setAttribute('width', 1280);
          canvas.setAttribute('height', 720);
         var photo = document.createElement('photo');
         
          video.srcObject = mediaStream;
          video.onloadedmetadata = (e)=> {
            console.log(this.state.data);
            console.log(this.state.mx);            
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



//////////////////////////////////////////

startRecording() {
  //e.preventDefault();
  // wipe old data chunks
  this.chunks = [];
  // start recorder with 10ms buffer
  this.mediaRecorder.start(10);
  // say that we're recording
  this.setState({recording: true});
}

stopRecording() {
  //e.preventDefault();
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

  const blob = new Blob(this.chunks, {type: 'audio/wav'});
  // this.chunks = [];
  // generate video url from blob
  //const audioURL = window.URL.createObjectURL(blob);
  // // append videoURL to list of saved videos for rendering
  // const audios = this.state.audios.concat([audioURL]);
  // this.setState({audios});

  // ------------------->this to download and then send AUDIO
 // var a = document.createElement("a");
  //document.body.appendChild(a);
  //a.style = "display: none";
 // a.href = audioURL;
 // a.download = 'record.wav';
 // a.click();
 // window.URL.revokeObjectURL(audioURL);
 // document.body.removeChild(a);
 
  let data = new FormData();
  data.append('file', blob, 'record.wav');
  axios({
      method: "post",
      url: "http://21f496c0c402.ngrok.io/predictVoice",
      data: data,
      
      headers: {'Content-Type': `multipart/form-data; boundary=${data._boundary}`},
    })
    .then((res) => {
      console.log(res);
      return res;
    });
}
/*
deleteAudio(audioURL) {
  // filter out current videoURL from the list of saved videos
  const audios = this.state.audios.filter(a => a !== audioURL);
  this.setState({audios});
}
*/








////////////////////////////////////////////////
    render() {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 3);
      return (
        <div>
          <Header show = "false"/>    
          <div id="container">
            {!this.state.start && (
            <div className="alert alert-primary m-2" role="alert">
              <p>You have to attempt all the questions given to you to get the feedback</p>
              <p>There will be a question button, if you clicked on, it will show you the next question</p>
              <p>After showing the question, you will get 30 secs to prepare your self to answer it</p>
              <p>After 30 secs, an alert will be shown to you with a message GOOOO!!!, close it and start answering</p>
              <p>You will be evaluated since then</p>
              <p>After finishing your answer, press the next question immediately as if you won't and stoppped answering, you will be evaluated badly for that</p>
              <p>Please, make sure that your face completely appears in the window to give the best results</p>
              <p>If you are ready, click start button below and GOOD LUCK</p>
            </div>
              )}

              {!this.state.start && <ControlledCarousel/>}

              {this.state.showQuestion && (<div class="card">
                                                <div class="card-header">
                                                  Questions
                                                </div>
                                                <div class="card-body">
                                                  <blockquote class="blockquote mb-0">
                                                    <p>{this.state.data[this.state.idx - 1].question}</p>
                                                  </blockquote>
                                                </div>
                                              </div>)}

           {this.state.start && <video autoPlay={true} id="videoElement" style={{width:"60%"}}></video>}

           {this.state.showQuestion && !this.state.showQuestionButton && <MyTimer expiryTimestamp={time}/>}

           {this.state.start && (<audio style={{width: 400}}
                ref={a => {
                  this.audio = a;
                }}>
                <p>Audio stream not available. </p>
                </audio>)}

          </div>
          {/* <br/> */}
          {!this.state.start && <button onClick={this.streamCamVideo} type="button" className="btn btn-primary start m-5" style={{position:'relative', left:'38%', width:"20%", fontSize: 35, fontWeight:'bold'}}>Start</button> }
          {/* <Recvoice/> */}
          {this.state.start && this.state.showQuestionButton  && <button onClick={this.takeQuestion} type="button" class="btn btn-primary start" style={{position:'absolute', left:'30%', width:"15%", fontSize: 35, fontWeight:'bold', bottom:"25%"}}>Question</button>}

        </div>
      );
    }
}
//export default Video;
export default withRouter(connect(mapStateToProps)(Video));