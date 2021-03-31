import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { withRouter } from 'react-router-dom';
import Webcam from "react-webcam";

const WebcamCapture = () => {
          const webcamRef = React.useRef(null);

          const capture = React.useCallback(
            () => {
              const imageSrc = webcamRef.current.getScreenshot();
            },
            [webcamRef]
          );

          return (
            <>
              <Webcam
                audio={false}
                height={620}
                width={1000}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                // videoConstraints={videoConstraints}
              />
              <button onClick={capture}>Capture photo</button>
            </>
          );
        };

class Home extends Component {
    render() {
        
        return (
            <div>
                <Header />
                <div className="mt-10">
                    <br></br>
                    <WebcamCapture />
                </div>
                
                <Footer />
            </div>
        );
    }
}

export default withRouter(Home);