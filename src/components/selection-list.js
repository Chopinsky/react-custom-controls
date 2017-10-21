import React, { Component } from 'react';
import './selection-list.css';

const reinsert = (arr, from, to) => {
  if (!arr) {
    return null;
  }

  if (isNaN(from) || isNaN(to) || from === to) {
    return arr;
  }

  const arrCopy = arr.slice(0);   // create shallow copy of the array
  const val = arrCopy[from];      // save off the value
  arrCopy.splice(from, 1);        // remove val from position [from]
  arrCopy.splice(to, 0, val);     // insert val to position [to]

  return arrCopy;
}

const getPosIndex = (n, max, min) => {
  if (!n || !max || !min) {
    return 0;
  }

  if (~~n > ~~max) {
    return ~~max;
  } else if (~~n < ~~min) {
    return ~~min;
  } else {
    return ~~n;
  }
}

const springConfig = { 'stiffness': 300, 'damping': 50 }

export default class SelectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'focusedItem': null,
      'draggedItem': null,
      'data': props.data
    };

    this.dragHandler = this.dragHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.shuffleHandler = this.shuffleHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.selectFirst && this.props.data.length > 0) {
      this.clickHandler(this.props.data[0].id);
    }
  }

  clickHandler(id) {
    this.setState({ focusedItem: id });
    if (!!this.props.onItemClicked && typeof this.props.onItemClicked === 'function') {
      this.props.onItemClicked(id);
    }
  }

  isActive(key) {
    if (key === this.state.focusedItem) {
      return this.props.selectionClassName + ' ' + this.props.itemClassName;
    }

    return 'list-default ' + this.props.itemClassName;
  }

  renderItem(text, icon) {
    if (!icon) {
      return <div>{text}</div>;
    } else {
      return (
        <div>
          <div className="item-icon-warpper">
            <img src={icon} alt={text} className={this.props.itemIconClassName} />
          </div>
          <div className="item-text-warpper">
            {text}
          </div>
        </div>
      );
    }
  }

  dragHandler(event, index) {
    event.stopPropagation();
    this.setState({ 'draggedItem': index });
  }

  dropHandler(event, index) {
    event.stopPropagation();
    this.setState({ 'draggedItem': null });
  }

  shuffleHandler(event, index) {
    if (this.state.data[index].id !== this.state.data[this.state.draggedItem].id) {
      const items = reinsert(this.state.data, this.state.draggedItem, index);
      this.setState({ 'data': items });
    }
  }

  render() {
    console.log('render!');
    const listItems = this.state.data.map((item, index) => {
      if (!item.id || !item.name) {
        return null;
      }

      return (
        <li key={index} id={item.id} ref={'item-' + index}
            className={this.isActive(item.id)}
            draggable={true}
            onDragStart={(e) => this.dragHandler(e, index)}
            onDragEnter={(e) => this.shuffleHandler(e, index)}
            onDrop={(e) => this.dropHandler(e, index)}
            onClick={this.clickHandler.bind(this, item.id)}>
          {this.renderItem(item.name.toString(), item.icon)}
        </li>);
    });

    return (
      <div className={'list ' + this.props.controlClassName}>
        <ul className='list-grouper'>
          {listItems}
        </ul>
      </div>
    );
  }
}

SelectionList.defaultProps = {
  data: [],
  selectionClassName: 'list-focus',
  controlClassName: 'control-style',
  itemClassName: 'list-item',
  itemIconClassName: 'item-icon',
  selectFirst: true
}
