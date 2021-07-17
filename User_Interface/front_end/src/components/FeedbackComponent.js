import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Link } from 'react-router-dom';
import CCard from 'react-bootstrap/Card';
import CCardHeader from 'react-bootstrap/Card';
import CCardBody from 'react-bootstrap/Card'
import { Chart } from "react-google-charts";
import { Component } from 'react';
class Feedback extends Component {
    constructor(props){

    }

    render(){
        return(
            <div>
              <Header/>
              <div class="row">
                 <div class="col-6" id="feedback" >
                        
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
                              <div class="inline-block" >      
                                      <p class="font_cursive">
                                            Technical Q/A
                                      </p> 
                              </div>
                                  <div class="inline-block">
                                      <img  src="analysis.png" width="50" height="50" />
                                  </div>
                             
                              <footer className="blockquote-footer">
                                  Q1 <cite title="Source Title">what is the machine learning?</cite>
                                  
                              </footer>
                              <footer className="blockquote-footer">
                                  Your Answer <cite title="Source Title">Extracting knowledge from data</cite>
                              </footer>
                              <footer className="blockquote-footer">
                                  the correct answer: hello world
                              </footer>
                              </blockquote>
                              <div>
                                  <div class="inline-block" >      
                                      <p class="font_cursive">Facial Expressions</p> 
                                  </div>
                                  <div class="inline-block">
                                    
                                      <img  src="face1.png" width="50" height="50" />
                                  </div>
                                  <p>in overall, your facial expression is good, but you need to practise more, it seems that your are a little bit nervous, but relax, the self confidence is very important in interview</p>
        
                                  <ul>
                                        <li>smile, there is nothing better than smiling but don't overdose smiling so it appears fake</li>
                                        <li>don't close your eyebrow since it makes you look angry</li>
                                        <li>Practice more and relax</li>
                                  </ul>
                              </div>  
                                      
                              
                                <div >
                                  <div class="inline-block" >      
                                      <p class="font_cursive">Voice modulation</p> 
                                      
                                  </div>
                                  <div class="inline-block">
                                    
                                      <img  src="voice-command.png" width="50" height="50" />
                                  </div>
                                  <p>it's clear that your are nervious so you look as you are angry, but here is some advices to enhance your voice</p>
                                  <ul>
                                        <li>Lower the pitch of your voice slightly when speaking</li>
                                        <li>you speak a little bit fast, try to speak in regular speed</li>
                                        <li>Practice more and relax</li>
                                   </ul>
                              </div>  
                              <div>
                                    <div class="inline-block" > 
        
                                        <p class="font_cursive">recommendations</p> 
                                    </div>
        
                                    <div class="inline-block">
                                        
                                        <img  src="quality.png" width="40" height="40" />
                                    </div>
                                    <ul>
                                        <li> <a href="https://www.coursera.org/learn/machine-learning" target="_blank">Machine learning course, Andrew Ng</a></li>
                                        <li><a href="https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/" target="_blank">Pattern Recognition and Machine Learning, textbook</a></li>
                                        <li><a href="https://www.cin.ufpe.br/~tfl2/artificial-intelligence-modern-approach.9780131038059.25368.pdf" target="_blank">artificial intelligence a modern approach (Book)</a></li>
                                    </ul>
        
                              </div>
                                               </CCardBody>        
                        </CCard>
                   </div>
                <div > 
                    <Chart
                              width={'500px'}
                              height={'300px'}
                              chartType="Bar"
                              loader={<div>Loading Chart</div>}
                              data={[
                                ['Performance%', 'Techniqal questions', 'Facial Expression', 'Voice'],
                                ['2014', 100, 40, 50],
                                
                              ]}
                              options={{
                                // Material design options
                                chart: {
                                  title: 'Overall Performance',
                                  subtitle: 'technical, facial expression, and voice modulation',
                                },
                              }}
                              // For tests
                              rootProps={{ 'data-testid': '2' }}
                      />
                </div>
              </div>
     
            <Footer/>
        </div>
            )
    }
}


export default Feedback;