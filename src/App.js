import React, { Component } from 'react';
import { Header } from './Header';
import { Chart } from './Chart';
<<<<<<< HEAD
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
=======
import { Portfolio } from './Portfolio';
>>>>>>> b4eb707af4c41497b190a71423e6e015b1d189b5

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
<<<<<<< HEAD
        <DropdownUtil options={ dropDownOptions } />
        <div>
          <Counter increment={1} color={NICE} />
          <Counter increment={5} color={SUPER_NICE} />
        </div>
        <Chart style={ {height: '400px', width: '400px'} }/>
=======
        <Portfolio />
        <Chart />
>>>>>>> b4eb707af4c41497b190a71423e6e015b1d189b5
      </div>
    );
  }
}
