import React, { Component } from 'react';

class Island extends Component {
 
  render() {
    const { price, onChange } = this.props;
    
    return (
      <input type="text" value={price} onChange={({ currentTarget: { value } }) => onChange(value)}/>
    );
  }

}

export default Island;