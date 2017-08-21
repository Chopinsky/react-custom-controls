import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './image-slider.css';

const TransitionStyle = {
  'translate': 'translate',
  'scale': 'scale',
  'blur': 'blur',
  'rotate': 'rotate'
}

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'current': 0,
      'direction': 1
    };

    this._nextSlide = this._nextSlide.bind(this);
    this._prevSlide = this._prevSlide.bind(this);

    this.LeftArrow = this._renderArrow(true, this.props.arrowClassName);
    this.RightArrow = this._renderArrow(false, this.props.arrowClassName);
  }

  render() {
    if (!this.props.data || !this.props.data.length) {
      return null;
    }

    const slide = this.props.data[this.state.current];
    if (!slide || !slide.bgImagePath) {
      return null;
    }

    const style = {
      backgroundImage: 'url(' + slide.bgImagePath + ')'
    }

    return (
      <div
        className={this.props.controlClassName + ' slider-control'}
        style={this.props.style}
        >
        {this.LeftArrow}
        {this.RightArrow}
        <ReactCSSTransitionGroup
          className='slider-bg'
          transitionName={this._getTransitionClass(this.props.transitionStyle)}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div style={style} className='div-slide' key={this.state.current}></div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  _getTransitionClass(style) {
    if (style === TransitionStyle.translate) {
      return this.state.direction === 1 ? 'translate-left' : 'translate-right';
    } else {
      return this.props.transitionStyle;
    }
  }

  _nextSlide() {
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const slideCount =
      (this.state.current === (this.props.data.length-1)) ? 0 : (this.state.current + 1);
    this.setState({ 'current': slideCount, 'direction': 1 });
  }

  _prevSlide() {
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const slideCount =
      (this.state.current === 0) ? (this.props.data.length - 1) : (this.state.current - 1);
    this.setState({ 'current': slideCount, 'direction': -1 });
  }

  _renderArrow(isLeft, className) {
    if (!className) {
      className = 'slider-arrow';
    }

    const arrow = isLeft ? '<' : '>';
    className += isLeft ? ' slider-arrow-left' : ' slider-arrow-right';

    return (
      <div
        className={className}
        onClick={isLeft ? this._prevSlide : this._nextSlide}>
        <i className='slider-arrow-icon' aria-hidden="true">{arrow}</i>
      </div>
    );
  }
}

ImageSlider.defaultProps = {
  data: [],
  controlClassName: '',
  backgroundClassName: 'slider-background',
  arrowClassName: 'slider-arrow',
  transitionStyle: 'translate'
}
