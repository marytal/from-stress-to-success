import React, { Component } from 'react';
import generateChartConfig from './chartHelper';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';

var age = 29;
var retirementAge = 60;
var yearsInProjection = 61; // data.length
var ageOfProjectedDeath = 90;

export default class Chart extends Component {
  render() {
    let {chartData, scenarioIndex} = this.props;
    console.log(scenarioIndex)
    let chart = Object.keys(this.props.chartData).length > 0 ? <ReactHighcharts config = {generateChartConfig(chartData, age, 57, retirementAge, scenarioIndex)}></ReactHighcharts> : null
    return (
      <div>
        {chart}
      </div>
    );
  }
}
