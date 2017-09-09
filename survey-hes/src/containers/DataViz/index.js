import React, { Component } from 'react';

import TitleBar from './imports/TitleBar';
import MapBox from './imports/MapBox';
import GraphBox from './imports/GraphBox'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TitleBar/>
      </div>
    );
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById("root") //Attach to where?
);
