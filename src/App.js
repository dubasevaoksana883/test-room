import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rooms from './Components/Rooms/Rooms.js'
import {Provider}   from 'react-redux';
import store from './store.js';
import SelectPanel from './Components/SelectPanel/SelectPanel.js'

store.subscribe(()=>console.log(store.getState()));

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <Rooms />
          <SelectPanel />
        </div>
      </Provider>
    );
  }
}

export default App;
