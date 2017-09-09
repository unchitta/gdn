import React, { Component } from 'react';

class Island extends Component {

  render() {
    const { price, onChange } = this.props;

    return (
      <div>
        <div className="text-margin">
          <p>Last time you bought diesel,</p>
          <p>how much did you pay per litre?</p>
        </div>
        <input className="price-input" type="text" value={price} onChange={({ currentTarget: { value } }) => onChange(value)}/>
      </div>
    );
  }

}

export default Island;
