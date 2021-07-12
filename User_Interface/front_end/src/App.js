import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import Home from './components/HomeComponent.js';
import './App.css';


const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/">
                <Home />
            </Route>
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
