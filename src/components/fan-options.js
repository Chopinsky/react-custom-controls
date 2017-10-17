'use strict';

import React from 'react';

// default props:
const defaultMainButtonDiam = 90;
const defaultChildButtonDiam = 50;

export default class ExpandableOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      "fanAngle": this.normalizeFanAngle(this.props.fanAngle),
      "isOpen": false
    }

    this.getDeltaPos = this.getDeltaPos.bind(this);
    this.getSeparationAngles = this.getSeparationAngles.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fanAngle !== this.props.fanAngle) {
      this.setState({ "fanAngle": this.normalizeFanAngle(nextProps.fanAngle) });
    }
  }
  
  degToRad(deg) {
    return Math.PI * deg / 180;
  }
 
  degOffset(index, total, fanAngle) {
    return 90 + fanAngle * ((index / (total - 1)) - 0.5);
  }

  normalizeFanAngle(fanAngle) {
    return parseInt(fanAngle) <= 360 ? fanAngle : 360;
  }

  getDeltaPos(index) {
    if (index === null || index === undefined || index === NaN) {
      return {};
    }

    const degOffset = this.degOffset(index, this.props.children.length, this.state.fanAngle);
    const radOffset = this.degToRad(degOffset);

    return {
      "dx": -1 * this.props.radius * Math.cos(radOffset),
      "dy": this.props.radius * Math.sin(radOffset)
    }
  }

  mainBtnStyle() { 
    return {
      "width": defaultMainButtonDiam,
      "height": defaultMainButtonDiam,
      "top": this.props.verticalPosition - (defaultMainButtonDiam / 2),
      "left": this.props.horizontalPosition - (defaultMainButtonDiam / 2)
    }
  }

  initChildBtnStyle() {
    return {
      "width": defaultChildButtonDiam,
      "height": defaultChildButtonDiam,
      "top": this.props.verticalPosition - (defaultChildButtonDiam / 2),
      "left": this.props.horizontalPosition - (defaultChildButtonDiam / 2)
    }
  }

  finalChildBtnStyle(index) {
    let {dx, dy} = this.getDeltaPos(index);
    return {
      "width": defaultChildButtonDiam,
      "height": defaultChildButtonDiam,
      "top": this.props.verticalPosition + dx,
      "left": this.props.horizontalPosition - dy
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}