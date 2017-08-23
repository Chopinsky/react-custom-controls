import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './image-slider.css';
import './slide-items.css';

export default class SlideItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'transitionClass': this._getTransitionClass(this.props.direction, this.props.transitionStyle)
    };
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
      if (this.props.activeIndex !== index) {
        return null;
      }

      const style = {
        backgroundImage: `url(${slide.bgImage})`
      };

      return (
        <CSSTransition
          in={this.props.activeIndex === index}
          key={index}
          timeout={{ 'enter': 350, 'exit': 350 }}
          classNames={this.state.transitionClass}
        >
          <div style={style} className='div-slide' key={index}></div>
        </CSSTransition>
      );
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
}

SlideItems.defaultProps = {
  data: [],
  direction: 1,
  activeIndex: 0,
  transitionStyle: 'translate'
}
