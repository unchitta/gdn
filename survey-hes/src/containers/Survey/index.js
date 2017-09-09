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
      success: false,
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

  handleSubmit = () => {
    const date = new Date();
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    fetch('https://hes.delta9.link/api/location', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        lineid: this.state.userId,
        geolocation: {
          x: this.state.geolocation.coords.latitude,
          y: this.state.geolocation.coords.longitude,
        },
        price: this.state.price,
        currency: "thb",
        locname: this.state.island,
        time: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:00`
      })
    }).then(() => {
      this.setState({ success: true });
      window.close();
    });
  }

  render() {
    const { no_geolocation, geolocation, island, price, success } = this.state;
    if (success) {
      return (
        <Wrapper>
          <p>Thank you for participating!</p>
        </Wrapper>
      );
    }
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
        <br/>
        {island.length && price.length ?
        <button className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.handleSubmit();}}>Submit</button>
        : null}
      </Wrapper>
    );
  }

}

export default Survey;
