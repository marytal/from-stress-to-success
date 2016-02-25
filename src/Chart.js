
import React, { Component } from 'react';

export default class Chart extends Component {
  render() {
    return (
      <ReactHighcharts config = {generateConfigForChart(userTestData, premiumTestData, 55, 'Stuff', -80, -7)}></ReactHighcharts>
    );
  }
}

var Highcharts = require('highcharts');

var getYearSeries = function(startYear, endYear){
  var years = [];

  for (var i = startYear; i < endYear + 1; ++i) {
    years.push(i)
  }
  return years;
}

var age = 29;
var retirementAge = 60;
var yearsInProjection = 61 // data.length

// Expects that Highcharts was loaded in the code.
var ReactHighcharts = require('react-highcharts/bundle/highcharts');

var userTestData = [100000, 110197.06, 122890.55, 135287.24, 147773.07, 160540.07, 173621.14, 187136.93, 201415.06, 215648.91, 229891.01, 245196.78, 259658.34, 273882.25, 288498.17, 304800.01, 321968.34, 339405.85, 356991.49, 373385, 392444.5, 407926.68, 423624.37, 439540.01, 455676.13, 472035.23, 488619.89, 505432.66, 522476.18, 539753.07, 557265.99, 507872.44, 458219.6, 408306.12, 358130.62, 307691.73, 256988.07, 249206.36, 241383.81, 233520.19, 225615.29, 217668.89, 209680.78, 201650.74, 193578.55, 185463.98, 177306.81, 169106.83, 160863.8, 152577.5, 144247.7, 135874.17, 127456.69, 118995.02, 110488.93, 101938.19, 93342.57, 84701.82, 76015.72, 67284.01, 58506.47];
var premiumTestData = userTestData.map(function(data) { return data / 2});


var generateConfigForChart = function(userData, premiumUserData, ageOfStress, stressTestTitle, userChange, premiumUserChange) {
  var stressedUserData = recalculateDataPoints(userData, ageOfStress - age, userChange);
  var stressedPremiumData = recalculateDataPoints(premiumUserData, ageOfStress - age, premiumUserChange);

  var config = {
          chart: {
              type: 'area'
          },
          title: {
              text: stressTestTitle
          },
          xAxis: {
            title: {
              text: 'Age'
            },
            categories: getYearSeries(29, 90),
            labels: {
              step: 2,
              maxStaggerLines: 1,
            },
            plotBands: {
              from: retirementAge - age,
              to: yearsInProjection,
              color: 'rgba(250, 250, 250, 0.5)',
              zIndex: 5,
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
          plotOptions: {
            area: {
              marker: {
                radius: 1
              }
            },
            series: {
              pointInterval: 1,
              animation: false
            }
          },
          series: [{
            name: 'Your Premium Account',
            data: stressedUserData
          }, {
            name: 'Your Holdings',
            data: stressedPremiumData
          }]
  };

  return config;

}

var recalculateDataPoints = function(data, yearOfChange, change){
  var percentageChange = (100 + change) / 100
  data = data.map(function(data, i) { // data = data.map... ?
    if(i < yearOfChange){
      return data;
    } else if(i > yearOfChange) {
      return data * percentageChange;
    } else if(i == yearOfChange) {
      return {y: data, marker: { fillColor: '#00bcd4', radius: 5 } };
    }
  });
  return data;
}
