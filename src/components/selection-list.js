import React, { Component } from 'react';
import './selection-list.css';

export default class SelectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedItem: ""
    };
  }

  _clickHandler(id) {
    this.setState({ focusedItem: id });
    if (!!this.props.onItemClicked && typeof this.props.onItemClicked === 'function') {
      this.props.onItemClicked(id);
    }
  }

  _isActive(key) {
    if (key === this.state.focusedItem) {
      return this.props.selectionClassName + " list-item";
    }

    return "list-default list-item";
  }

  _controlClassName() {
    return 'list ' + this.props.controlClassName;
  }

  componentDidMount() {
    if (this.props.selectFirst && this.props.data.length > 0) {
      this._clickHandler(this.props.data[0].id);
    }
  }

  render() {
    const listItems = this.props.data.map((item, index) => {
      if (!item.id || !item.name) {
        return null;
      }

      return (
        <li key={index} id={item.id} ref={'item-' + index}
            className={this._isActive(item.id)}
            onClick={this._clickHandler.bind(this, item.id)}>
          {item.name.toString()}
        </li>);
    });

    return (
      <div className={this._controlClassName()}>
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
  selectFirst: true
}
