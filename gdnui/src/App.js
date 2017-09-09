import React, { Component } from 'react';
import './App.css';
import MapWrapper from "./containers/MapWrapper";
import Graph from "./containers/Graph";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapWrapper/>
        <Graph/>
      </div>
    );
  }
}

export default App;
