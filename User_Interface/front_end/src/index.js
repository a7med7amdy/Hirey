import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import App from './App';
import Video from './components/VideoComponent'
import reportWebVitals from './reportWebVitals';

const videoJsOptions = {
  controls: true,
  bigPlayButton: false,
  width: 320,
  height: 240,
  fluid: false,
  plugins: {
      /*
      // wavesurfer section is only needed when recording audio-only
      wavesurfer: {
          backend: 'WebAudio',
          waveColor: '#36393b',
          progressColor: 'black',
          debug: true,
          cursorWidth: 1,
          msDisplayMax: 20,
          hideScrollbar: true,
          displayMilliseconds: true,
          plugins: [
              // enable microphone plugin
              WaveSurfer.microphone.create({
                  bufferSize: 4096,
                  numberOfInputChannels: 1,
                  numberOfOutputChannels: 1,
                  constraints: {
                      video: false,
                      audio: true
                  }
              })
          ]
      },
      */
      record: {
          audio: true,
          video: true,
          maxLength: 20,
          debug: true
      }
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App/>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
