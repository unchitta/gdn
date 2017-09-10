import React, { Component } from 'react';

class MapWrapper extends Component {

  shouldComponentUpdate() {
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

    const endpoint = 'https://hes.delta9.link/api/location';
    // const endpoint = 'http://localhost:8080/api/location';

    fetch(endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        json.forEach(point => {
          const markerHtmlStyles = `
            background-color: ${point.color};
            width: 1rem;
            height: 1rem;
            display: block;
            left: -0.75rem;
            top: -0.75rem;
            position: relative;
            border-radius: 1rem 1rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF`;

          const icon = window.L.divIcon({
            className: 's',
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
            html: `<span style="${markerHtmlStyles}" />`
          });

          const Marker = window.L.marker([point.geolocation.x, point.geolocation.y], {
            icon: icon
          })
            .addTo(this.mymap)
            .bindPopup(`${point.locname}: ${point.price} ${point.currency}`);
          const self = this;
          Marker.on('mouseover', function(e) {
              this.openPopup();
              self.props.onChangeIsland(point.locname);
            })
            .on('mouseout', function(e) {
              this.closePopup();
              self.props.onChangeIsland(null);
            });
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
