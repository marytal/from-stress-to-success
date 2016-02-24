import React, { Component } from 'react';
import { Header } from './Header';
import { Chart } from './Chart';
import { DropdownUtil } from './DropdownUtil';
import { NICE, SUPER_NICE } from './colors';


class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

export class App extends Component {
  render() {
    var dropDownOptions = ['option1', 'option2', 'option3'];
    return (
      <div>
        <Header />
        <DropdownUtil options={ dropDownOptions } />
        <div>
          <Counter increment={1} color={NICE} />
          <Counter increment={5} color={SUPER_NICE} />
        </div>
        <Chart style={ {height: '400px', width: '400px'} }/>
      </div>
    );
  }
}
