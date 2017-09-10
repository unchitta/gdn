import React, {Component} from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryLabel,
  VictoryTheme,
  VictoryBrushContainer,
  VictoryArea,
  VictoryAxis
} from 'victory';

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
    const endpoint = 'https://hes.delta9.link/api/location';
    // const endpoint = 'http://localhost:8080/api/location';

    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => this.initMap(json))
      .catch((err) => {
      });
  }

  initMap(json) {
    const islandsValues = {};
    json.forEach((data) => {
      if (!islandsValues[data.locname]) {
        islandsValues[data.locname] = [];
      }
      islandsValues[data.locname].push(data);
    });

    const islandsLine = Object.keys(islandsValues).map((islandName) => ({
      id: islandName,
      color: islandsValues[islandName][0].color,
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
    const islandsLine = this.state.islandsLine;
    const lines = [];
    if (!this.state.islandsLine.length) {
      return null;
    }

    const dFrom = new Date();
    dFrom.setMonth(2);

    return (
      <div className="graph">
        <div>

          <VictoryChart scale={{ x: 'time' }}
                        width={document.body.clientWidth} height={470}
                        theme={VictoryTheme.material}
                        domain={{x: [dFrom, new Date()], y: [25, 36]}}
          >
            <VictoryLabel text={"THB / L diesel"} x={10} y={230} angle={"270"}/>
            {islandsLine.filter((item) => {
              if (this.props.curIslandId !== null && item.id != this.props.curIslandId) {
                return false;
              }
              return true;
            }).map((island) => {
              const dat = island.values.map((i) => {
                return {
                  x: new Date(i.date * 1000),
                  y: i.price
                }
              });

              if (this.props.curIslandId !== null) {
                return (<VictoryLine  key={island.id}
                                      data={dat}
                                      style={{
                                        data: { stroke: island.color },
                                        parent: { border: "1px solid #ccc"}
                                      }}
                />);
              }

              return (<VictoryScatter key={island.id}
                                   style={{data: {fill: island.color}}}
                                   size={3}
                                   data={dat}
              />)
            })}
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
