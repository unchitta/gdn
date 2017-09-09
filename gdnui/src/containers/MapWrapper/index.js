import React, { Component } from 'react';

class MapWrapper extends Component {

  componentDidMount() {
    const mymap = window.L.map('mapid').setView([12.221295, 100.881145], 5);
    window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5kcmVpYXNodSIsImEiOiJjajdkOTNuZ3cwN245MnFvMnp2cnhjZXB3In0.nYt_dBz4wwYd9X_mP4zzVg', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
  }

  render() {

    return (
      <div id="mapid" style={{height: '25vw'}}>
      </div>
    );
  }

}

export default MapWrapper;
