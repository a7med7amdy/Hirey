import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Link } from 'react-router-dom';
import CCard from 'react-bootstrap/Card';
import CCardHeader from 'react-bootstrap/Card';
import CCardBody from 'react-bootstrap/Card'
import Bar  from "react-chartjs-2";

function Feedback(props) {
    return(
    <div>
         <Header/>
         <div id="feedback" >
         <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1552, 1319, 613, 1400],
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
            <CCard id="card">
                <CCardHeader >
                    <div >
                        <div class="inline-block" >      
                              <p id="feedback_font">Your Interview's report is ready</p>   
                        </div>
                        <div class="inline-block">
                            <img  src="rocket.png" width="40" height="40" />
                        </div>
                    </div>      
                </CCardHeader>
                
                
              
                <CCardBody>
                    <blockquote className="blockquote mb-0">
                    <p>
                        your are good
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                    </blockquote>
                </CCardBody>        
            </CCard>
         </div>
        
       
       <Footer/>
    </div>
    )
}

export default Feedback;