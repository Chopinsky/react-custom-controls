import React, { Component } from 'react';
import './selection-list.css';

export default class SelectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedItem: ""
    };
  }

  clickHandler(id) {
    this.setState({ focusedItem: id });
    if (!!this.props.onItemClicked && typeof this.props.onItemClicked === 'function') {
      this.props.onItemClicked(id);
    }
  }

  isActive(key) {
    if (key === this.state.focusedItem) {
      return this.props.selectionClassName + " list-item";
    }

    return "list-default list-item";
  }

  render() {
    const listItems = this.props.data.map((item, index) => {
      if (!item.id || !item.name) {
        return null;
      }

      return (
        <li key={index} id={item.id} ref={'item-' + index}
            className={this.isActive(item.id)}
            onClick={this.clickHandler.bind(this, item.id)}>
          {item.name.toString()}
        </li>);
    });

    return (
      <div>
        <div className="selection-list">
          <ul className="list-grouper">
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}

SelectionList.defaultProps = {
  data: [],
  selectionClassName: 'list-focus'
}
