import React, { Component } from 'react';

import Geolocation from '../../components/Geolocation';
import Island from '../../components/Island';
import Wrapper from './Wrapper';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_geolocation: false,
      geolocation: {},
      island: '',
      price: 0,
      loading: true,
    };
  }

  handleGeolocationComplete = (pos) => {
    this.setState({ 
      geolocation: pos 
    });
  }
  
  handleGeolocationError = () => {
    this.setState({ 
      no_geolocation: true 
    });
  }

  render() {
    const { no_geolocation, geolocation, island } = this.state;
    return (
      <Wrapper>
        {!no_geolocation && !geolocation.coords ?
        <Geolocation 
          onComplete={this.handleGeolocationComplete}
          onError={this.handleGeolocationError}
        /> : null }
        {(no_geolocation || geolocation.coords) ? 
        <Island
          geolocation={geolocation}
          no_geolocation={no_geolocation}
          island={island}
          onComplete={this.handleGeolocationComplete}
        /> : null }
      </Wrapper>
    );
  }

}

export default Survey;
