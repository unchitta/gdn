import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis } from 'victory';

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      islandsLine: []
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.handleBrush = this.handleBrush.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:8080/api/location')
    .then((res) => res.json())
    .then((json) => this.initMap(json))
    .catch((err) => {});
  }

  initMap(json) {
    console.log('JSONNN', json);
    const islandsValues = {};
    json.forEach((data) => {
      if (!islandsValues[data.locname]) {
        islandsValues[data.locname] = [];
      }
      islandsValues[data.locname].push(data);
    });

    const islandsLine = Object.keys(islandsValues).map((islandName) => ({
      id: islandName,
      values: islandsValues[islandName].map((value) => ({
        date: value.time,
        price: value.price,
      })),
    }));
    this.setState({islandsLine});
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    console.log(this.state.islandsLine);
    const islandsLine = this.state.islandsLine;
    const lines = [];
    if (!this.state.islandsLine.length) {
      return null;
    }

    return (
      <div className="graph">
        <div>
        <VictoryChart width={document.body.clientWidth} height={470} scale={{x: "time"}}
          containerComponent={
            <VictoryZoomContainer
              dimension="x"
              zoomDomain={this.state.zoomDomain}
              onDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          {islandsLine.map((island) => {
                  const dat = island.values.map((i) => {
                    if (!i.date) {
                      console.log('Got null date', i);
                    }
                    return {
                      date: new Date(i.date * 1000),
                      price: i.price
                    }
                  });

                  return (<VictoryLine key={island.id}
                    style={{
                      data: {stroke: "tomato"}
                    }}
                    data={dat}
                    x="date"
                    y="price"
                  />)})
          }

          </VictoryChart>

      </div>
      </div>

    );
  }
}

export default Graph;


/**
 <VictoryChart
 padding={{top: 0, left: 50, right: 50, bottom: 30}}
 width={600} height={50} scale={{x: "time"}}
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
                {key: new Date(1982, 1, 1), price: 125},
                {key: new Date(1987, 1, 1), price: 257},
                {key: new Date(1993, 1, 1), price: 345},
                {key: new Date(1997, 1, 1), price: 515},
                {key: new Date(2001, 1, 1), price: 132},
                {key: new Date(2005, 1, 1), price: 305},
                {key: new Date(2011, 1, 1), price: 270},
                {key: new Date(2015, 1, 1), price: 470}
              ]}
 x="key"
 y="price"
 />
 </VictoryChart>
 */
