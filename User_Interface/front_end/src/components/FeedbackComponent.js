import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import CCard from 'react-bootstrap/Card';
import CCardHeader from 'react-bootstrap/Card';
import CCardBody from 'react-bootstrap/Card'
import { Chart } from "react-google-charts";
import { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
const mapStateToProps = state => {
    return {
   
    }
  }
 
class Feedback extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            Facial_Evaluation:"",
            Facial_advices:[],
            Voice_Evaluation:"",
            Voice_advices:[],
            recommendation_Collection:[],
            wrong_answers:[],
            MaxFacialValue:0,
            maxFacialEmotion:"",
            MaxVoiceValue:0,
            maxVoiceEmotion:"",
            voicePercentage:0,
            FacePercentage:0,
            AnswersPercentage:0,
  
        };
      
    }
    redirectHome = () => {
        this.props.history.push({
            pathname:"/",
          
          });
    }
    async componentDidMount() {
     /* Just For Debug */ 
        console.log("Face: ",this.props.location.state.face_dic);
        console.log("Voice: ",this.props.location.state.voice_dic);
        console.log("Question: ", this.props.location.state.Question_dic);
     
     
        /*
            Facial Expression Evaluation. 
        */
            var sum1=0;
            var sz1=0;
            var frequencies1=0;
            for(var key in this.props.location.state.face_dic){
                frequencies1=this.props.location.state.face_dic[key];
                if(frequencies1!==0){
                    sz1+=frequencies1;
                    if(key==="good"){
                        sum1+=frequencies1;
                    }
                    else if(key==="medium"){
                        sum1+=0.7*frequencies1;
                    }
                    else{
                        sum1-=0.5*frequencies1;
                    }
                }
                if (this.props.location.state.face_dic[key]>this.state.MaxFacialValue){
                    this.state.maxFacialEmotion=key;
                    this.state.MaxFacialValue=this.props.location.state.face_dic[key];
                }
            }
            sum1=sum1/sz1;
            sum1=sum1*100;
            
            if(sum1<=0)sum1=10;
            //this.state.FacePercentage=sum1;
            this.setState({FacePercentage: sum1});
            switch(this.state.maxFacialEmotion){
                case "good":
                    {
                        this.setState({Facial_Evaluation:
                        "In overall, your facial expression is good, it seems you are a smiley person :) keep going and never stop practising!"});
                      
                        break;
                    }
                case "bad":
                    {
                        this.setState({Facial_Evaluation:
                            "Unfortunately , from your facial expressions, it seems you are nervous and fear from the interview, but don't worry about it, with Hiery we will make you familiar with interview process and put a beautiful smile on your beautiful face :)"});
                            //Assign Advices. 
                        this.state.Facial_advices.push(
                            {id:1,
                            advice:"Smile, there is nothing better than smiling but don't overdose smiling so it appears fake"});
                        this.state.Facial_advices.push(
                            {id:2,
                            advice:"Don't close your eyebrow since it makes you look angry"});
                        this.state.Facial_advices.push({
                            id:3,
                            advice:"Practice more and relax"});
                        
                        break;
                    }
                default:
                    {
                        this.setState({Facial_Evaluation:
                            "In overall, your facial expression is OK, but smile because smiling make you appear more confident!"});
                            //Assign Advices. 
                        this.state.Facial_advices.push(
                            {id:1,
                            advice:"Smile, there is nothing better than smiling but don't overdose smiling so it appears fake"});
                    
                        this.state.Facial_advices.push({
                            id:2,
                            advice:"Practice more and relax"});
                          
                    }
            }
        
        /*
            Voice Evaluation. 
        */
            var sum=0;
            var sz=0;
            var frequencies=0;
            for(var key in this.props.location.state.voice_dic){
                frequencies=this.props.location.state.voice_dic[key];
                if(frequencies!=0){
                    sz+=frequencies;
                    if(key=="good"){
                        sum+=frequencies;
                    }
                    else if(key=="medium"){
                        sum+=frequencies*0.7;
                    }
                    else{
                        sum-=frequencies*0.5;
                    }
                }

                if (this.props.location.state.voice_dic[key]>this.state.MaxVoiceValue){
                    this.state.maxVoiceEmotion=key;
                    this.state.MaxVoiceValue=this.props.location.state.voice_dic[key];
       
                }
            }
            sum=sum/sz;
            sum=sum*100;
            if(sum<=0)sum=6;
            this.setState({voicePercentage:sum});
           // this.state.voicePercentage = sum;

            switch(this.state.maxVoiceEmotion){
                case "good":
                    {
                        this.setState({Voice_Evaluation:
                        "In overall, your voice modulation is good, it seems you are relax keep going and never stop practising!"});
                        //Assign Advices. 
                       /* this.state.Voice_advices.push(
                            {id:1,
                            advice:""});
                        this.state.Voice_advices.push(
                            {id:2,
                            advice:"Don't close your eyebrow since it makes you look angry"});
                        this.state.Voice_advices.push({
                            id:3,
                            advice:"Practice more and relax"});*/
                
                        break;
                    }
                case "bad":
                    {
                        this.setState({Voice_Evaluation:
                            "Unfortunately , your voice makes you appear as nervous, fear and Unconfident"});
                        //Assign Advices. 
                        this.state.Voice_advices.push(
                            {id:1,
                            advice:"Lower the pitch of your voice slightly when speaking"});
                        this.state.Voice_advices.push(
                            {id:2,
                            advice:"You speak a little bit fast, try to speak in regular speed"});
                        this.state.Voice_advices.push({
                            id:3,
                            advice:"Practice more and relax"});
                        break;
                    
                    }
                default:
                    {
                        this.setState({Voice_Evaluation:
                            "In overall, your Voice is OK, but still need practising more!"});
                            //Assign Advices. 
                        this.state.Voice_advices.push(
                            {id:1,
                            advice:"Raise the pitch of your voice slightly when speaking"});
                        this.state.Voice_advices.push(
                            {id:2,
                            advice:"You speak a little bit slow, try to speak in regular speed"});
                        this.state.Voice_advices.push({
                            id:3,
                            advice:"Practice more and relax"});
                     
                    
                    }
            }
        /*
            Show only wrong answered questions with their correct answers.
        */
       var sum=0;
       var sz=0;
       
         for(var key in this.props.location.state.Question_dic){
            var result_list = this.props.location.state.Question_dic[key];
            var num=parseFloat(result_list[1]);
            console.log(num);
            sum=sum+num;
            sz+=1;
            if(num<=0.5){
                this.state.wrong_answers.push(
                    {
                        question:key,
                        answer:result_list[0]
                    }
                );
                
            }
        
          } 
        
          sum=sum/sz;
          sum=sum*100;
          this.setState({AnswersPercentage: sum});
         
        /*
            Set recommendations according to job selected. 
        */
        switch(this.props.location.state.job){
            case "Deep Learning":
            {
              this.state.recommendation_Collection.push({
                id: 1,
                url: 'https://www.coursera.org/specializations/deep-learning',
                title:'Deep Learning Specialization'
              });
              this.state.recommendation_Collection.push({
                id: 2,
                url:'https://www.udacity.com/course/deep-learning-nanodegree--nd101',
                title: 'Deep Learning, nanodegree, udacity'
                
              });
              this.state.recommendation_Collection.push({
                id: 3,
                url:'https://www.amazon.com/dp/0262035618?tag=hackr-20&geniuslink=true',
                title: 'Deep Learning (Adaptive Computation and Machine Learning series) Illustrated Edition'
                
              });
            
              break;
            }
            case "machine Learning":
            {
                this.state.recommendation_Collection.push({
                    id: 1,
                    url: 'https://www.coursera.org/learn/machine-learning',
                    title:'Machine learning course, Andrew Ng'
                  });
                this.state.recommendation_Collection.push({
                    id: 2,
                    url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/',
                    title:'Pattern Recognition and Machine Learning, textbook'
                 });
                 this.state.recommendation_Collection.push({
                    id: 3,
                    url: 'http://aima.cs.berkeley.edu/',
                    title:'Artificial intelligence a modern approach berkeley'
                    });
                break;
            }
            case "Software Development Engineer":
            {
                this.state.recommendation_Collection.push({
                    id: 1,
                    url: 'https://docs.google.com/file/d/0B21HoBq6u9TsUHhqS3JIUmFuamc/view?resourcekey=0-MYlet9RIjEukd6CvLEHUbw',
                    title:'Object-Oriented Programming in C++ (4th Edition) by Robert'
                  });
                this.state.recommendation_Collection.push({
                    id: 2,
                    url: 'https://www.coursera.org/specializations/java-programming',
                    title:'Java Programming and Software Engineering Fundamentals Specialization'
                 });
                 this.state.recommendation_Collection.push({
                    id: 3,
                    url: 'https://www.coursera.org/specializations/software-design-architecture',
                    title:'Software Design and Architecture Specialization'
                    });
              break;
            }
            default:
            {
                this.state.recommendation_Collection.push({
                    id: 1,
                    url: 'https://www.coursera.org/specializations/natural-language-processing',
                    title:'Natural Language Processing Specialization'
                  });
                this.state.recommendation_Collection.push({
                id: 2,
                url:'https://www.amazon.com/Natural-Language-Processing-Python-Analyzing/dp/0596516495/ref=as_li_ss_tl?dchild=1&keywords=Natural+Language+Processing+with+Python:+Analyzing+Text+with+the+Natural+Language+Toolkit&qid=1597364811&sr=8-1&linkCode=sl1&tag=inspiredalgor-20&linkId=23224187246d533ee4037d78ee56cc0a&language=en_US',
                title: 'Natural Language Processing with Python: Analyzing Text with the Natural Language Toolkit 1st Edition'
                
                  });
            }
          }
      }
    
    render(){
       
        return(
            <div>
              <Header/>
              <div className="row">
                 <div className="col-6" id="feedback" >
                        
                        <CCard id="card">
                            <CCardHeader >
                                <div >
                                    <div className="inline-block" >      
                                          <p id="feedback_font">Your Interview's report is ready</p>   
                                  </div>
                                  <div className="inline-block">
                                      <img  src="rocket.png" width="40" height="40" />
                                  </div>
                              </div>      
                          </CCardHeader>
                              
                          <CCardBody>
                              <blockquote id="feedback_context" className="blockquote mb-0">
                              <div className="inline-block" >      
                                      <p className="font_cursive">
                                            Technical Q/A
                                            
                                      </p> 
                                      
                              </div>
                              
                                  <div className="inline-block">
                                      <img  src="analysis.png" width="50" height="50" />
                                      
                                  </div>
                                  <hr></hr>
                         
                                  {
                                    this.state.wrong_answers.map((item, idx) =>
                                    <footer key={idx}>
                                        <strong>{item.question}</strong>
                                              <br></br>
                                          <em className="answer"> {item.answer}</em>
                                        <br></br>
                                        <br></br>
                                    </footer>
                                    
                             
                                    )
                                  } 
    
                              </blockquote>
                              <hr></hr>
                              <div id="feedback_context">
                                  <div className="inline-block" >      
                                      <p className="font_cursive">Facial Expressions</p> 
                                  </div>
                                  <div className="inline-block">
                                    
                                      <img  src="face1.png" width="50" height="50" />
                                  </div>
                                  <hr></hr>
                                  <p className="fontFeedback">{this.state.Facial_Evaluation}</p>
                                  
                                  <ul>
                                        {
                                        this.state.Facial_advices.map((item) =>
                                            <li className="fontFeedback" key={item.id}>
                                                {item.advice}   
                                            </li>
                                        )
                                        } 
                                  </ul>
                              </div>  
                                      
                              <hr></hr>
                                <div id="feedback_context">
                                  <div className="inline-block" >      
                                      <p className="font_cursive">Voice modulation</p> 
                                      
                                  </div>
                                  <div className="inline-block">
                                    
                                      <img  src="voice-command.png" width="50" height="50" />
                                  </div>
                                  <hr></hr>
                                  <p className="fontFeedback">{this.state.Voice_Evaluation}</p>
                                  <ul>
                                        {
                                        this.state.Voice_advices.map((item) =>
                                            <li className="fontFeedback" key={item.id}>
                                                {item.advice}   
                                            </li>
                                        )
                                        } 
                                    </ul>
                              </div>  
                              <hr></hr>
                              <div id="feedback_context">
                                    <div className="inline-block" > 
        
                                        <p className="font_cursive">Recommendations</p> 
                                    </div>
        
                                    <div className="inline-block">
                                        
                                        <img  src="quality.png" width="40" height="40" />
                                    </div>
                                    <hr></hr>
                                    <ul>
                                        {
                                        this.state.recommendation_Collection.map((item) =>
                                            <li key={item.id}>
                                                <a href= {item.url} target="_blank">{item.title}
                                                    </a>
                                            </li>
                                        )
                                        } 
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
                                ['Percentage', this.state.AnswersPercentage, this.state.FacePercentage, this.state.voicePercentage],
                                
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
                      <Button id="redirectBtn" onClick={this.redirectHome}>Take another Mock Interview</Button>
                </div>
              </div>
     
            <Footer/>
        </div>
            )
    }
}

export default withRouter(connect(mapStateToProps)(Feedback));