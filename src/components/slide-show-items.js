import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './slide-show-items.css';
import './slide-show-transitions.css';

export default class SlideShowItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'transitionClass': this._getTransitionClass(this.props.direction, this.props.transitionStyle)
    };

    this._createSlide = this._createSlide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.direction !== nextProps.direction
        || this.props.transitionStyle !== nextProps.transitionStyle) {
      this.setState({
        'transitionClass': this._getTransitionClass(nextProps.direction, nextProps.transitionStyle)
      });
    }
  }

  render() {
    const slides = this.props.data.map((slide, index) => {
      return this._createSlide(slide, index);
    });

    return (
      <TransitionGroup className='div-bg'>
        {slides}
      </TransitionGroup>
    );
  }

  _getTransitionClass(direction, style) {
    if (style === 'translate') {
      return direction === 1 ? style + '-left' : style + '-right';
    } else {
      return style;
    }
  }

  _createSlide(slide, index) {
    if (this.props.activeIndex !== index) {
      return null;
    }

    const style = {
      backgroundImage: `url(${slide.bgImage})`
    };

    const titleSection = !slide.title ? null : (
      <div className='text-title-container'>
        <p className='text-title'>{slide.title}</p>
      </div>
    );

    const detailsSection = !slide.details ? null : (
      <div className='text-details-container'>
        <p className='text-details'>{slide.details}</p>
      </div>
    );

    const textSection = (!titleSection && !detailsSection) ? null : (
      <div className={this.props.titleSectionClass}>
        {titleSection}
        {detailsSection}
      </div>
    );

    return (
      <CSSTransition
        in={this.props.activeIndex === index}
        key={index}
        timeout={{ 'enter': 350, 'exit': 350 }}
        classNames={this.state.transitionClass}
      >
        <div style={style} className='div-slide' key={index}>
          {textSection}
        </div>
      </CSSTransition>
    );
  }
}

SlideShowItems.defaultProps = {
  data: [],
  direction: 1,
  activeIndex: 0,
  prevIndex: '',
  titleSectionClass: 'div-text-sec',
  transitionStyle: 'translate'
}
