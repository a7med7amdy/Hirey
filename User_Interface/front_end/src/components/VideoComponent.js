import React ,{ useState }from 'react';
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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const serverURL = "http://1c4d6a69f706.ngrok.io";


const mapStateToProps = state => {
  return {
    data: state.data
  }
}

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  return (
    <div style={{display:"inline-block", position:'absolute', left:'80%', bottom:"35%"}}>
      <div>
        <h1 style={{color:'blue', textAlign:"center"}}> Be Ready  </h1>
        <div style={{fontSize: '80px', textAlign:"center"}}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      {seconds === 0 ? <div style={{fontSize:25, color:'red', fontWeight:'bold'}}> <p > Your response</p>
                <p style={{textAlign:'center'}}> is recording </p> 
                </div> : null}
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


const audioType = 'audio/wav';

class Video extends React.Component {
  state = { 
    video:null,
    start:false,
    good:0,
    medium:0,
    bad:0,
    data:[],
    showQuestion:false,
    mx:0,
    idx:0,
    mediaStream:null,
    mediaStream2:null,
    startAnswering:false, 
    recording: false,
    audios: [],
    showQuestionButton:true,
    restartTimer: true,
    voice_dic:{"good":0,"bad":0,"medium":0},
    tmp:null,
    Question_dic:{},
    prob:0
  };
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
        if (err.name !== "TypeError") {
          throw err;
        }
        // Even if they do, they may only support MediaStream
        this.audio.src = URL.createObjectURL(mediaStream);
        }
      } else {
        this.audio.src = URL.createObjectURL(new Blob([mediaStream], {type: audioType}));
      }
    this.audio.play();
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
      }, 10000);
  }

  takeQuestion = ()=>{
    this.setState({restartTimer: false});
    setTimeout(function() { 
      this.setState({restartTimer: true}) //After 0.5 second, set render to true
    }.bind(this), 500);
    this.setState({showQuestionButton:false});
    if(this.state.idx>0){
      this.stopRecording()
      this.state.mediaStream2.getAudioTracks()[0].stop();
    }
    this.setState({startAnswering:false});
    this.setState({showQuestion:true},()=>{
      if(this.state.idx <= this.state.mx){
        console.log("HIIHIII")
        var msg = new SpeechSynthesisUtterance();
        msg.text = this.state.data[this.state.idx - 1].question;
        window.speechSynthesis.speak(msg);
      }
    });
    this.setState({idx:this.state.idx+1});
    if(this.state.idx !== this.state.mx)
      this.countDown();
    if(this.state.idx === this.state.mx){
      this.setState({showQuestion:false},()=>{
          this.setState({start:false});
      });
      this.state.mediaStream2.getAudioTracks()[0].stop();
      this.state.mediaStream.getVideoTracks()[0].stop();
    
      // TODO
      //redirect to statistic page
      document.getElementById('container').style.display = 'none';
      document.getElementById('wait').style.display = 'block';
      setTimeout(() => {
        this.props.history.push({
          pathname:"/feedback",
          state: { 
            face_dic:{"good":this.state.good,"bad":10, "medium":5},
            voice_dic:this.state.voice_dic, 
            Question_dic:this.state.Question_dic,
            job:this.props.location.state.job
             }
        });
        }, 30000);
      
    }
  }

  takephoto=()=>{
    if(this.state.start === true && this.state.startAnswering === true){
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
          url: serverURL+"/predict",
          data: bodyFormData,
          
          headers: {'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`},
        })
          .then((response)=> {
            //handle success
            if(response.data === "good ")
              this.setState({good:this.state.good + 1});
            else if (response.data === "bad ")
              this.setState({bad:this.state.bad + 1});
            else
              this.setState({medium:this.state.medium + 1});


            console.log("good ",this.state.good);
            console.log("bad ",this.state.bad);
            console.log("medium ",this.state.medium);
          })
          .catch(function (response) {
            //handle error
            console.log("Fuck error: ",response);
          });
    }
  }
  streamCamVideo() {
    this.setState({start : true})
    var constraints = { audio: false, video: { width: 1280, height: 720 } };
    navigator.mediaDevices.getUserMedia(constraints).then((mediaStream)=> {
      this.setState({mediaStream:mediaStream})
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
    //setTimeout(this.saveAudio, 10000);
}

 saveAudio() {
  // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: 'audio/wav'});
    this.chunks = [];


    let data = new FormData();
    data.append('file', blob, 'record.wav');
    let dataSim = new FormData();
    dataSim.append('file', blob, 'record.wav');
    dataSim.append('ans1', this.state.data[this.state.idx - 1].answer1);
    dataSim.append('ans2', this.state.data[this.state.idx - 1].answer2);
    dataSim.append('ans3', this.state.data[this.state.idx - 1].answer3);
    dataSim.append('question', this.state.data[this.state.idx - 1].question);
    axios({
      method: "post",
      url: serverURL+"/predictVoice",
      data: data,
      headers: {'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'Access-Control-Allow-origin':'*'}
    })
    .then((res) => {

      this.state.voice_dic["good"]+=res.data["good"];
      this.state.voice_dic["bad"]+=res.data["bad"];
      this.state.voice_dic["medium"]+=res.data["medium"];
     
    });
     axios({
      method: "POST",
      url: serverURL+"/predictSimilarity",
      data: dataSim,
      headers: {'Content-Type': `multipart/form-data; boundary=${dataSim._boundary}`}
    })
    .then((res) => {
      var tuna=res.data;
      console.log(tuna);
      //question = [answer, prob]
      this.state.Question_dic[tuna[0]] = [tuna[1], tuna[2]];    
      console.log(res)
    
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }


////////////////////////////////////////////////
  render() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10);
    return (
      <div>
        <Header show = "false"/>    
        <div id="container" >
          {!this.state.start && (
          <div className="alert alert-primary m-2" role="alert">
            <p> Hello, please follow these instructions when taking your interview: </p>
            <ol>
              <li>Be sure that your environment is quiet, free of distractions, and well it.</li>
              <li>Keep your head and shoulders centered in the camera frame. </li>
              <li>Do not place a light source directly behind you. keep your face free of shadows</li>
              <li>your voice must be clear and the letters are correct.</li>
            </ol>
            <p>You have to attempt all the questions given to you to get the feedback.</p>
            <p>There will be a question button, if you clicked on, it will show you the next question.</p>
            <p>After showing the question, you will get 10 secs to prepare your self to answer it.</p>
            <p>After finishing your answer, press the next question immediately as if you won't and stoppped answering, you will be evaluated badly for that.</p>
            <p>If you are ready, click start button below and GOOD LUCK.</p>
          </div>
            )}

            {!this.state.start && <ControlledCarousel/>}

            {this.state.showQuestion && (<div className="card">
                                              <div className="card-header">
                                                Questions
                                              </div>
                                              <div className="card-body" >
                                                <blockquote className="blockquote">
                                                  <p>{this.state.data[this.state.idx - 1].question}</p>
                                                </blockquote>
                                              </div>
                                            </div>)}

          {this.state.start && <video autoPlay={true} id="videoElement"  style={{width:"60%"}}></video>}

          {this.state.showQuestion && this.state.restartTimer && <MyTimer expiryTimestamp={time}/>}

          {this.state.start && (<audio style={{width: 400}}
              ref={a => {
                this.audio = a;
              }}>
              <p>Audio stream not available. </p>
              </audio>)}
              {!this.state.start && <button onClick={this.streamCamVideo} type="button" className="btn btn-primary start m-5" style={{position:'relative', left:'38%', width:"20%", fontSize: 35, fontWeight:'bold'}}>Start</button> }
        </div>

      
        {/* <Recvoice/> */}
        {this.state.start && this.state.showQuestionButton  && <button onClick={this.takeQuestion} type="button" className="btn btn-primary start" style={{position:'absolute', left:'30%', width:"15%", fontSize: 30, fontWeight:'bold', bottom:"20%"}}>Next Question</button>}
        <div style={{display:'none'}} id="wait" className="alert alert-primary m-2" role="alert">
            <p> Please wait until your report is ready, be patient!</p>        
          </div>
      </div>
      
    );
  }
}
export default withRouter(connect(mapStateToProps)(Video));