'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Motion, StaggeredMotion, spring } from 'react-motion';

// default props:
const DEFAULT_MAIN_DIAM = 90;
const DEFAULT_CHILD_DIAM = 50;
const DEFAULT_SPRING_CONFIG = { stiffness: 400, damping: 28 };

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

  componentDidMount() {
    let childButtons = [];

    Array(this.props.children.length).fill(0).forEach((_, index) => {
      childButtons.push(this.renderChildButton(index));
    });

    this.setState({childButtons: childButtons.slice(0)});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fanAngle !== this.props.fanAngle) {
      this.setState({ "fanAngle": this.normalizeFanAngle(nextProps.fanAngle) });
    }
  }

  getSprintConfig() {
    return {
      "stiffness": this.props.stiffness || DEFAULT_SPRING_CONFIG.stiffness,
      "damping": this.props.damping || DEFAULT_SPRING_CONFIG.damping
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

  calcDeltaPos(index) {
    if (index === null || index === undefined || index === NaN) {
      return {};
    }

    const degOffset = this.degOffset(index, this.props.children.length, this.state.fanAngle);
    const radOffset = this.degToRad(degOffset);

    this.dx = -1 * this.props.radius * Math.cos(radOffset),
    this.dy = this.props.radius * Math.sin(radOffset)
  }

  mainBtnStyle() { 
    return {
      "width": DEFAULT_MAIN_DIAM,
      "height": DEFAULT_MAIN_DIAM,
      "top": this.props.verticalPosition - (DEFAULT_MAIN_DIAM / 2),
      "left": this.props.horizontalPosition - (DEFAULT_MAIN_DIAM / 2)
    }
  }

  initChildBtnStyle() {
    return {
      "width": DEFAULT_CHILD_DIAM,
      "height": DEFAULT_CHILD_DIAM,
      "top": this.props.verticalPosition - (DEFAULT_CHILD_DIAM / 2),
      "left": this.props.horizontalPosition - (DEFAULT_CHILD_DIAM / 2)
    }
  }

  transitionalChildBtnStyle(index) {
    this.calcDeltaPos(index);
    
    return {
      "width": DEFAULT_CHILD_DIAM,
      "height": DEFAULT_CHILD_DIAM,
      "top": this.props.verticalPosition - this.dy,
      "left": this.props.horizontalPosition + this.dx
    }
  }

  finalChildBtnStyle(index) {
    return {
      "width": DEFAULT_CHILD_DIAM,
      "height": DEFAULT_CHILD_DIAM,
      "top": spring(this.props.verticalPosition - this.dy, this.getSprintConfig()),
      "left": spring(this.props.horizontalPosition + this.dx, this.getSprintConfig())
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}