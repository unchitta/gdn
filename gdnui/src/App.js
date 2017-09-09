import React, { Component } from 'react';
import './App.css';
import MapWrapper from "./containers/MapWrapper";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapWrapper/>
      </div>
    );
  }
}

export default App;
