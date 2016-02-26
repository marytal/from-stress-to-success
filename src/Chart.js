import React, { Component } from 'react';
import generateChartConfig from './chartHelper';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';

global.Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

var age = 29;
var retirementAge = 60;

export default class Chart extends Component {
  render() {
    let {chartData, scenarioIndex} = this.props;
    let chart = Object.keys(this.props.chartData).length > 0 ? <ReactHighcharts config = {generateChartConfig(chartData, age, 40, retirementAge, scenarioIndex)}></ReactHighcharts> : null
    return (
      <div>
        {chart}
      </div>
    );
  }
}
