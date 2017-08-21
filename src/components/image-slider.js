import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import './image-slider.css';

const TransitionStyle = {
  'translate': 0,
  'scale': 1,
  'blur': 2,
  'rotate': 3
}

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._nextSlide = this._nextSlide.bind(this);
    this._prevSlide = this._prevSlide.bind(this);
  }

  render() {
    return (
      <div className={this.props.controlClassName}>
      </div>
    );
  }

  _nextSlide() {
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const slideCount =
      (this.state.current === this.props.data.length) ? 0 : (this.state.current + 1);
    this.setState({ 'current': slideCount });
  }

  _prevSlide() {
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const slideCount =
      (this.state.current === 0) ? (this.props.data.length - 1) : (this.state.current - 1);
    this.setState({ 'current': slideCount });
  }

  _renderArrow(isLeft, className) {
    const arrow = isLeft ? '<' : '>';
    if (!className) {
      className = 'slider-arrow';
    }

    return (
      <div
        className={className}
        onClick={isLeft ? this._prevSlide() : this._nextSlide()}>
        <i className='slider-arrow-icon' aria-hidden="true">{arrow}</i>
      </div>
    );
  }
}

ImageSlider.defaultProps = {
  data: [],
  controlClassName: 'slider-control',
  backgroundClassName: 'slider-background',
  arrowClassName: 'slider-arrow'
}
