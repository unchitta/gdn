import React, { Component } from 'react';
import { Creatable } from 'react-select';
import { geocodeKey } from '../../config';
import islandValues from './values';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import 'react-select/dist/react-select.css';


class Island extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_geocode: false,
      possibleResult: '',
      loading: true,
    }
  }

  componentWillMount() {
    const { no_geolocation, geolocation, island } = this.props;
    if (!island.length && !no_geolocation) {
      const latlng = `${geolocation.coords.latitude},${geolocation.coords.longitude}`;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${geocodeKey}`;
      fetch(geocodeUrl)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (!json.results || !json.results.length) {
            this.setState({
              no_geocode: true,
              loading: false
            });
            return;
          }
          const address = json.results[0].formatted_address;
          const possibleResult = getPossibleIslandFromGeocode(address, islandValues);
          if (possibleResult !== '') {
            this.setState({
              possibleResult: possibleResult,
              loading: false,
            });
          } else {
            this.setState({
              no_geocode: true,
              loading: false,
            });
          }
        })
        .catch(() => {
          this.setState({
            no_geocode: true,
            loading: false,
          });
        });
    }
  }

  handleSelection = (value) => {
    if (value && value.value) {
      this.handleSuccess(value.value);
    }
  }

  handleSuccess = (islandName) => {
    this.props.onComplete(islandName);
  }

  render() {
    const { no_geolocation, island } = this.props;
    const { no_geocode, loading, possibleResult } = this.state;
    if (island.length) {
      return (
        <div className="island complete">
          <p>{island}</p>
        </div>
      );
    }
    if (loading) {
      return (
        <div className="geolocation">
        <LinearProgress mode="indeterminate" />
        <p>
          Gathering Island...
        </p>
        </div>
      );
    }
    if (possibleResult !== '') {
      return (
        <div className="island choice">
          <p>Is this your island?</p>
          <p>{islandValues[possibleResult].english} {islandValues[possibleResult].thai.length ? ` - ${islandValues[possibleResult].thai}` : ''}</p>
          <RaisedButton
            className="btn btn-primary" primary={true}
            onClick={(event) => {event.preventDefault(); this.handleSuccess(islandValues[possibleResult].english);}}>
            Yes
          </RaisedButton>
          <RaisedButton
            className="btn btn-secondary"
            onClick={(event) => {event.preventDefault(); this.setState({possibleResult: '', no_geocode: true});}}>
            No
          </RaisedButton>
        </div>
      );
    }
    if (no_geolocation || no_geocode) {
      const options = islandValues.map((value) =>
         ({ value: value.english, label: `${value.english} ${value.thai}` })
      );
      return (
        <div className="island input">
          <p>Enter the name of your island</p>
          <Creatable
            name="form-select-island"
            value=""
            options={options}
            onChange={this.handleSelection}
          />
        </div>
      )
    }
  }

}

export default Island;

function getPossibleIslandFromGeocode(address, islandValues) {
  let possibleResults = [];

  islandValues.forEach((islandValue, i) => {
    if (address.toLowerCase().includes(islandValue.english.toLowerCase())) {
      possibleResults.push(i);
    }
  });
  // If multiple results try to find the more probable results.
  if (possibleResults.length > 1) {
    let maxLength = 0;
    possibleResults
      .forEach((i) => {
        if (islandValues[i].english.length > maxLength) {
          maxLength = islandValues[i].english.length;
        }
      });
      possibleResults = possibleResults.filter((i) => {
        if (islandValues[i].english.length < maxLength) {
          return false;
        } else {
          return true;
        }
      });
  }
  return possibleResults.length ? possibleResults[0] : '';
}
