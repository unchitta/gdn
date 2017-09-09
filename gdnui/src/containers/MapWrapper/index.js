import React, { Component } from 'react';

class MapWrapper extends Component {

  componentShouldUpdate() {
    return false;
  }

  componentDidMount() {
    this.mymap = window.L.map('mapid').setView([12.221295, 100.881145], 5);
    window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5kcmVpYXNodSIsImEiOiJjajdkOTNuZ3cwN245MnFvMnp2cnhjZXB3In0.nYt_dBz4wwYd9X_mP4zzVg', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiYW5kcmVpYXNodSIsImEiOiJjajdkOTNuZ3cwN245MnFvMnp2cnhjZXB3In0.nYt_dBz4wwYd9X_mP4zzVg'
    }).addTo(this.mymap);

    // const endpoint = 'https://hes.delta9.link/api/location';
    const endpoint = 'http://localhost:8080/api/location';

    fetch(endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        json.forEach(point => {
          window.L.marker([point.geolocation.x, point.geolocation.y])
            .addTo(this.mymap)
            .bindPopup('Price: ' + point.price + ' ' + point.currency)
            .openPopup();
        })
      })
      .catch(err => {
        console.log('err while fetching data points', err);
      });
  }

  render() {

    return (
      <div id="mapid" style={{height: '25vw'}}>
      </div>
    );
  }
}

export default MapWrapper;
