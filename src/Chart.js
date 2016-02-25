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
    var chart = Object.keys(this.props.chartData).length > 0 ? <ReactHighcharts config = {generateChartConfig(this.props.chartData, age, 45, retirementAge, 3)}></ReactHighcharts> : null
    return (
      <div>
        {chart}
      </div>
    );
  }
}




// Expects that Highcharts was loaded in the code.
