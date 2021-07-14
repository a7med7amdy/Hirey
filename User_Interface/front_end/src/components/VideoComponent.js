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
import { useLocation } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    data: state.data
  }
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

class Video extends React.Component {
   state = { video:null,start:false,good:0,medium:0,bad:0,data:[],showQuestion:false,mx:0,idx:0,mediaStream:null};
    constructor(props) {
      super(props);
      this.streamCamVideo= this.streamCamVideo.bind(this);
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.takephoto(), 10000);
        this.setState({data:this.props.location.state.data});
        this.setState({mx:this.props.location.state.data.length});
      }

      takeQuestion = ()=>{
        console.log(this.state.idx);
        this.setState({showQuestion:true});
        this.setState({idx:this.state.idx+1});
        if(this.state.idx === this.state.mx){
          this.setState({showQuestion:false},()=>{
              console.log(this.state.showQuestion);
              this.setState({start:false});
          });
          console.log("hiiii");
          this.state.mediaStream.getVideoTracks()[0].stop();
          
          // TODO
          //redirect to statistic page
          //this.props.history.push({pathname:"/"});
        }
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
              url: "http://d65db9b03dee.ngrok.io/predict",
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
    render() {
      return (
        <div>
          <Header />    

          <div id="container">
            {!this.state.start && (
            <div className="alert alert-primary m-2" role="alert">
              <p>you have to attempt all the questions given to you to get the feedback <mark>if you pause the stream during answering, we will continue evaluating you.</mark> so, take care</p>
              <p>if you are ready, click start button below and GOOD LUCK</p>
            </div>
              )}

              {!this.state.start && <ControlledCarousel/>}

           {this.state.start && <video autoPlay={true} id="videoElement"></video>}
           {this.state.showQuestion && <p>{this.state.data[this.state.idx - 1].question}</p>}
          </div>
          <br/>
          {!this.state.start && <button onClick={this.streamCamVideo} type="button" className="btn btn-primary btn-lg start">start</button> }
          {/* <button onClick={this.streamCamVideo}>Start streaming</button> */}
          {this.state.start && <button onClick={this.takeQuestion} type="button" class="btn btn-primary btn-lg start">question</button>}
        </div>
      );
    }
}

  //export default Video;
  export default withRouter(connect(mapStateToProps)(Video));


  