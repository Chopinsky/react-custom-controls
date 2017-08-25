import React, { Component } from 'react';
import { default as SlideShowItems } from './slide-show-items';
import './slide-show.css';

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
      className={props.arrowClass}
      onClick={props.onClick}>
      <i className='slider-arrow-icon' aria-hidden="true">{arrow}</i>
    </div>
  );
};

export default class SlideShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'activeIndex': props.activeIndex || 0,
      'prevIndex': null,
      'direction': 1
    };

    this._set = this._set.bind(this);
    this._nextSlide = this._nextSlide.bind(this);
    this._prevSlide = this._prevSlide.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._renderArrows = this._renderArrows.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.state.activeIndex) {
      const direction = (nextProps.activeIndex < this.state.activeIndex) ? -1 : 1;
      const prevIndex = this.state.activeIndex;
      this._set(nextProps.activeIndex, prevIndex, direction);
    }
  }

  render() {
    if (!this.props.data || !this.props.data.length) {
      return null;
    }

    const { style, controlClass, arrowClass, ...other } = this.props;
    return (
      <div
        className={controlClass + ' slider-control'}
        style={style}
        onClick={(e) => this._clickHandler(e, 'prev')}
        onContextMenu={(e) => this._clickHandler(e, 'next')}
      >
        {this._renderArrows(arrowClass)}
        <SlideShowItems
          {...other}
          {...this.state}
        />
      </div>
    );
  }

  _clickHandler(event, direction) {
    event.preventDefault();

    if (direction === 'next') {
      this._nextSlide(event);
    } else {
      this._prevSlide(event);
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event);
    }

    return false;
  }

  _nextSlide(event) {
    event.stopPropagation();
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const prevIndex = this.state.activeIndex;
    const activeIndex =
      (this.state.activeIndex === (this.props.data.length - 1)) ? 0 : (this.state.activeIndex + 1);

    this._set(activeIndex, prevIndex, 1);
  }

  _prevSlide(event) {
    event.stopPropagation();
    if (!this.props.data || !this.props.data.length) {
      return;
    }

    const prevIndex = this.state.activeIndex;
    const activeIndex =
      (this.state.activeIndex === 0) ? (this.props.data.length - 1) : (this.state.activeIndex - 1);

    this._set(activeIndex, prevIndex, -1);
  }

  _set(activeIndex, prevIndex, direction) {
    if (this.props.transitionStyle === 'translate') {
      // this is the workaround on translate transition style, since
      // we need to update the 'stale' state of the class first when
      // reversing directions first, and then update the slides, otherwise
      // the previous slide will still 'leave' at the wrong direction.
      this.setState({'direction': direction});
      setTimeout(this._delayUpdateSlideIndex.bind(this, activeIndex, prevIndex), 0);
    } else {
      this.setState({
        'activeIndex': activeIndex,
        'prevIndex': prevIndex,
        'direction': direction
      });
    }
  }

  _delayUpdateSlideIndex(activeIndex, prevIndex) {
    this.setState({
      'activeIndex': activeIndex,
      'prevIndex': prevIndex
    });
  }

  _renderArrows(arrowClass) {
    return (
      <div className='slider-arrow-row'>
        <div className='slider-arrow-left'>
          <Arrow
            isLeft={true}
            onClick={this._prevSlide}
            arrowClass={arrowClass}
          />
        </div>
        <div className='slider-arrow-right'>
          <Arrow
            isLeft={false}
            onClick={this._nextSlide}
            arrowClass={arrowClass}
          />
        </div>
      </div>
    );
  }
}

SlideShow.defaultProps = {
  data: [],
  activeIndex: 0,
  controlClass: '',
  arrowClass: 'slider-arrow',
  titleSectionClass: 'div-text-sec',
  transitionStyle: TransitionStyle.rotate
}
