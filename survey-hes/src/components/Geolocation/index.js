import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

class Geolocation extends Component {
  componentWillMount() {
    if (navigator.geolocation) {
      getGeolocation()
      .then((pos) => {
        console.log(pos);
        this.props.onComplete(pos);
      })
      .catch((err) => {
        this.props.onError(err);
      });
    }
  }

  render() {
    return (
      <div className="geolocation">
      <LinearProgress mode="indeterminate" />
      <p>Sharing your location</p>
      </div>
    )
  }

}

export default Geolocation;

function getGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        reject(err);
      }
    );
  });
}