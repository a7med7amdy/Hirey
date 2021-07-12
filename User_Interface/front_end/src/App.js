import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/HomeComponent.js';
import Feedback from './components/FeedbackComponent.js'
function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/feedback">
            <Feedback />
        </Route>
        
        <Route path="/">
            <Home />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
