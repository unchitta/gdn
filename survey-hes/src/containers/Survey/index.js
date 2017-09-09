import React, { Component } from 'react';

import Geolocation from '../../components/Geolocation';
import Island from '../../components/Island';
import Price from '../../components/Price';
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

  handleIslandComplete = (name) => {
    this.setState({ 
      island: name 
    });
  }

  handlePriceChange = (price) => {
    this.setState({ 
      price: price 
    });
  }

  render() {
    const { no_geolocation, geolocation, island, price } = this.state;
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
          onComplete={this.handleIslandComplete}
        /> : null }
        {island.length ? 
        <Price
          price={price}
          onChange={this.handlePriceChange}
        />
        : null}

        {island.length && price.length ? 
        <button>Submit</button>
        : null}
      </Wrapper>
    );
  }

}

export default Survey;
