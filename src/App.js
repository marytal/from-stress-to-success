import React, { Component } from 'react';
import Header from './Header';
import Chart from './Chart';
import ChartContainer from './ChartContainer';
import Portfolio from './Portfolio';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import customTheme from './customTheme';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {chartData: {}}
    this.updateChartData = this.updateChartData.bind(this)
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(customTheme)
    };
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
        <Portfolio updateChartData={this.updateChartData} />
        <ChartContainer chartData={this.state.chartData} />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
}
