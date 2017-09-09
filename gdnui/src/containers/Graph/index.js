import React, { Component } from 'react';
import * as V from 'victory';

class Graph extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {

   

    fetch('https://hes.delta9.link/api/location')
    .then((res) => res.json())
    .then((json) => this.initMap(json))
    .catch((err) => {});
    

     

      
  }

  initMap(json) {
    const islandsValues = {};
    json.forEach((data) => {
      if (!islandsValues[data.locname]) {
        islandsValues[data.locname] = [];
      }
      islandsValues[data.locname].push(data);
    });

    

    var islandsLine = Object.keys(islandsValues).map((islandName) => ({
      id: islandName,
      values: islandsValues[islandName].map((value) => ({
        date: value.time,
        price: value.price,
      })),
    }));
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    return (
      <div className="graph">
        <div>
        <VictoryChart width={600} height={470} scale={{x: "time"}}
          containerComponent={
            <VictoryZoomContainer
              dimension="x"
              zoomDomain={this.state.zoomDomain}
              onDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {a: new Date(1982, 1, 1), b: 125},
                {a: new Date(1987, 1, 1), b: 257},
                {a: new Date(1993, 1, 1), b: 345},
                {a: new Date(1997, 1, 1), b: 515},
                {a: new Date(2001, 1, 1), b: 132},
                {a: new Date(2005, 1, 1), b: 305},
                {a: new Date(2011, 1, 1), b: 270},
                {a: new Date(2015, 1, 1), b: 470}
              ]}
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={600} height={100} scale={{x: "time"}}
            containerComponent={
              <VictoryBrushContainer
                dimension="x"
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {key: new Date(1982, 1, 1), b: 125},
                {key: new Date(1987, 1, 1), b: 257},
                {key: new Date(1993, 1, 1), b: 345},
                {key: new Date(1997, 1, 1), b: 515},
                {key: new Date(2001, 1, 1), b: 132},
                {key: new Date(2005, 1, 1), b: 305},
                {key: new Date(2011, 1, 1), b: 270},
                {key: new Date(2015, 1, 1), b: 470}
              ]}
              x="key"
              y="b"
            />
          </VictoryChart>
      </div>
      </div>

    );
  }
}

export default Graph;

