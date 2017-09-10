import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

class Island extends Component {

  render() {
    const { price, onChange } = this.props;

    return (
      <div>
        <div className="text-margin">
          <p>Last time you bought diesel,</p>
          <p>how much did you pay per litre?</p>
        </div>
        <TextField 
          type="number"
          hintText="00 THB" 
          style={{
            width: '70px',
          }}
          value={price} 
          onChange={({ currentTarget: { value } }) => onChange(value)}/>
      </div>
    );
  }

}

export default Island;
