'use strict';

import React from 'react';

// default props:
const defaultMainButtonDiam = 90;
const defaultChildButtonDiam = 50;

// helper functions
const degToRad = (deg) => Math.PI * deg / 180;
const degOffset = (index, total, fanAngle) => 90 + fanAngle * ((index / (total - 1)) - 0.5);
const normalizeFanAngle = (fanAngle) => parseInt(fanAngle) <= 360 ? fanAngle : 360;

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

  getSeparationAngles = () => {
    const childrenCount = this.props.children.length;
    return childrenCount <= 1 ? 0 : (this.state.fanAngle / (childrenCount - 1))
  }

  getDeltaPos = (index) => {
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

  render() {
    return (
      <div>
      </div>
    );
  }
}