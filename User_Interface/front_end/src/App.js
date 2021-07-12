import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import Home from './components/HomeComponent.js';
import Video from './components/VideoComponent';
import './App.css';


const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Switch>
          <Route path="/interview">
                <Video />
            </Route>
            
            <Route path="/">
                <Home />
            </Route>
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
