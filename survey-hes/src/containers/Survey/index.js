import React, { Component } from 'react';

import Geolocation from '../../components/Geolocation';
import Island from '../../components/Island';
import Price from '../../components/Price';
import Wrapper from './Wrapper';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      no_geolocation: false,
      geolocation: {},
      island: '',
      price: '',
      loading: true,
      success: false,
    };
  }

  componentWillMount() {
    const get = getUrlVars();
    this.setState({ userId: get['userId'] ? get['userId'] : ''});
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
        <Wrapper className="complete-survey">
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
        <Price className="price-input"
          price={price}
          onChange={this.handlePriceChange}
        />
        : null}
        <br/>
        {island.length ?
        <RaisedButton disabled={!price.length} className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.handleSubmit();}}>Submit</RaisedButton>
        : null}
      </Wrapper>
    );
  }

}

export default Survey;


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
}