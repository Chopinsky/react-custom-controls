import React, { Component } from 'react';
import './selection-list.css';

export default class SelectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedItem: ""
    };
  }

  componentDidMount() {
    if (this.props.selectFirst && this.props.data.length > 0) {
      this._clickHandler(this.props.data[0].id);
    }
  }

  _clickHandler(id) {
    this.setState({ focusedItem: id });
    if (!!this.props.onItemClicked && typeof this.props.onItemClicked === 'function') {
      this.props.onItemClicked(id);
    }
  }

  _isActive(key) {
    if (key === this.state.focusedItem) {
      return this.props.selectionClassName + ' ' + this.props.itemClassName;
    }

    return 'list-default ' + this.props.itemClassName;
  }

  _controlClassName() {
    return 'list ' + this.props.controlClassName;
  }

  _renderItem(text, icon) {
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

  render() {
    const listItems = this.props.data.map((item, index) => {
      if (!item.id || !item.name) {
        return null;
      }

      return (
        <li key={index} id={item.id} ref={'item-' + index}
            className={this._isActive(item.id)}
            onClick={this._clickHandler.bind(this, item.id)}>
          {this._renderItem(item.name.toString(), item.icon)}
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
  itemClassName: 'list-item',
  itemIconClassName: 'item-icon',
  selectFirst: true
}
