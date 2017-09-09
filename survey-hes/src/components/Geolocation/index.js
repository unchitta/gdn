import React, { Component } from 'react';

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
      <p>
        Gathering geolocation...
      </p>
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