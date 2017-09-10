import React, { Component } from 'react';
import './App.css';
import MapWrapper from "./containers/MapWrapper";
import Graph from "./containers/Graph";

class App extends Component {
  constructor() {
    super();

    this.state = {
      curIsland: null,
    };
    this.handleChangeIsland = this.handleChangeIsland.bind(this);
  }
  handleChangeIsland(islandId) {
    console.log('sfdsfsf', islandId);
    this.setState({curIsland: islandId});
  }

  render() {
    return (
      <div className="App">
        <MapWrapper onChangeIsland={this.handleChangeIsland}/>
        <Graph curIslandId={this.state.curIsland}/>
      </div>
    );
  }
}

export default App;
