import React, { Component } from 'react';
import * as d3 from 'd3';


class Graph extends Component {
  componentDidMount() {

    //2017-09-09T06:44:55.000Z
    const parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.price); });


    d3.json('https://hes.delta9.link/api/location', function(error, datas) {
      if (error) throw error;

      console.log(datas);


      const islandsValues = {};
      datas.forEach((data) => {
        if (!islandsValues[data.locname]) {
          islandsValues[data.locname] = [];
        }
        islandsValues[data.locname].push(data);
      });

      var islandsLine = Object.keys(islandsValues).map((islandName) => ({
        id: islandName,
        values: islandsValues[islandName].map((value) => ({
          date: parseDate(value.time),
          price: value.price,
        })),
      }));




      g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, ºF");

  var island = g.selectAll(".island")
    .data(islandsLine)
    .enter().append("g")
      .attr("class", "island");

  island.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

  island.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.price) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
      
    });
  }
  render() {
    return (
      <div className="graph">
        <svg width="960" height="500"></svg>
      </div>

    );
  }
}

export default Graph;
