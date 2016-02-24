
import React, { Component } from 'react';

export class Chart extends Component {
  render() {
    return (
      <ReactHighcharts config = {config}></ReactHighcharts>
    );
  }
}

var Highcharts = require('highcharts');

// Expects that Highcharts was loaded in the code.
var ReactHighcharts = require('react-highcharts/bundle/highcharts');

var config = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Hyperinflation'
        },
        xAxis: {
          title: {
            text: 'Date'
          },
          labels: {
            step: 2,
          },
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%e. %b',
            year: '%Y',
          },
        },
        yAxis: {
          title: {
            text: 'Projected Assets'
          },
          labels: {
            format: '${value:.0f}',
          },
          min: 0,
        },
        series: [{
            name: 'FutureAdvisor Managed',
            data: [10, 20, 60]
        }, {
            name: 'Current Holdings',
            data: [10, 15, 20]
        }]
};
