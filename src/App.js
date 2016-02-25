import React, { Component } from 'react';
import Header from './Header';
import Chart from './Chart';
import Portfolio from './Portfolio';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {chartData: {}}
    this.updateChartData = this.updateChartData.bind(this)
  }

  updateChartData(chartData) {
    this.setState({
      chartData
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Portfolio updateChartData={this.updateChartData}/>
        <Chart chartData={this.state.chartData}/>
      </div>
    );
  }
}
