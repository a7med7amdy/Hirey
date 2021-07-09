import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/HomeComponent.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
            <Home />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
