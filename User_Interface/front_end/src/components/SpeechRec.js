import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Video from './VideoComponent';

const videoJsOptions = {
  controls: true,
  bigPlayButton: false,
  fluid: true,
  width: 120,
  height: 120,
  aspectRatio: '3:1',
  autorecord: true,
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
          debug: true,
      }
  }
};

function SpeechRec() {
  const { transcript, resetTranscript } = useSpeechRecognition();  
  const handleListing = () => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    SpeechRecognition.stopListening();
    console.log("Result" + transcript);
  };

  const Test = () => {
    // resetTranscript();
    handleListing();
    setTimeout( function() {
        stopHandle();
    }, 20000)
  }
  return (
    <div >
        {/* {Test()} */}
        <Video { ...videoJsOptions } Test={Test}/>
    </div>
  );
}
export default SpeechRec;