import React, { Component } from 'react';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

export class DropdownUtil extends Component {
  render() {
    this.props.options
    return (
      <Dropdown color="primary" label="Choose Profile">
        {this.props.options.map(function(option) {
          return <DropdownItem key={option}>{option}</DropdownItem>;
        })}
      </Dropdown>
    );
  }
}

DropdownUtil.propTypes = {
 options: React.PropTypes.array
};
