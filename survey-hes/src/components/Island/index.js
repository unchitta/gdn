import React, { Component } from 'react';
import { geocodeKey } from '../../config';

class Island extends Component {
  componentWillMount() {
    const { no_geolocation, geolocation, island } = this.props; 
    if (!island.length && !no_geolocation) {
      const latlng = `${geolocation.coords.latitude},${geolocation.coords.longitude}`;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${geocodeKey}`;
      fetch('')
    }
  }

  render() {
    return (
      <p>
        Gathering Island...
      </p>
    )
  }

}

export default Island;
