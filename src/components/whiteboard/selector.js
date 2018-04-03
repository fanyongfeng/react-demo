import React, { Component } from 'react';
import Icon from '@components/icon';

class Selector extends Component {


  render() {
    return (
      <div className="tool-wrapper flex-col-center">
        <div className="tool-item">
          <Icon name="round2" size="16" color="#000"/>
        </div>
      </div>
    )
  }


};

export default Selector;