import React, { Component } from 'react';
import { default as SlideItems } from './slide-items';
import './image-slider.css';

const TransitionStyle = {
  'translate': 'translate',
  'scale': 'scale',
  'blur': 'blur',
  'rotate': 'rotate'
}

const Arrow = (props) => {
  const float = props.isLeft ? 'left' : 'right';
  const arrow = props.isLeft ? '<' : '>';

  return (
    <div
      style={{'float': float}}
      className={props.arrowClassName}
      onClick={props.onClick}>
      <i className='slider-arrow-icon' aria-hidden="true">{arrow}</i>
    </div>
  );
};

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'activeIndex': 0,
      'prevIndex': '',
      'direction': 1
    };

    this._nextSlide = this._nextSlide.bind(this);
    this._prevSlide = this._prevSlide.bind(this);

    this.Arrows = this._renderArrows();
  }

  render() {
    if (!this.props.data || !this.props.data.length) {
      return null;
    }

    return (
      <div
        className={this.props.controlClassName + ' slider-control'}
        style={this.props.style}
      >
        {this.Arrows}
        <SlideItems
          data={this.props.data}
          transitionStyle={this.props.transitionStyle}
          activeIndex={this.state.activeIndex}
          prevIndex={this.state.prevIndex}
          direction={this.state.direction}
        />
      </div>
    );
  }

  _nextSlide() {
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const prevIndex = this.state.activeIndex;
    const activeIndex =
      (this.state.activeIndex === (this.props.data.length - 1)) ? 0 : (this.state.activeIndex + 1);

    this.setState({'direction': 1});
    setTimeout(this._delayUpdateSlideIndex.bind(this, activeIndex, prevIndex), 0);
  }

  _prevSlide() {
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const prevIndex = this.state.activeIndex;
    const activeIndex =
      (this.state.activeIndex === 0) ? (this.props.data.length - 1) : (this.state.activeIndex - 1);

    this.setState({'direction': -1});
    setTimeout(this._delayUpdateSlideIndex.bind(this, activeIndex, prevIndex), 0);
  }

  _delayUpdateSlideIndex(activeIndex, prevIndex) {
    this.setState({
      'activeIndex': activeIndex,
      'prevIndex': prevIndex
    });
  }

  _renderArrows() {
    return (
      <div className='slider-arrow-row'>
        <div className='slider-arrow-left'>
          <Arrow
            isLeft={true}
            onClick={this._prevSlide}
            arrowClassName={this.props.arrowClassName}
          />
        </div>
        <div className='slider-arrow-right'>
          <Arrow
            isLeft={false}
            onClick={this._nextSlide}
            arrowClassName={this.props.arrowClassName}
          />
        </div>
      </div>
    );
  }
}

ImageSlider.defaultProps = {
  data: [],
  controlClassName: '',
  backgroundClassName: 'slider-background',
  arrowClassName: 'slider-arrow',
  transitionStyle: TransitionStyle.blur
}
