export default function generateChartConfig(chartData, age, ageOfStress, retirementAge, stressIndex) {

  if (stressIndex === -1) {
    return _generateBasicChart(chartData, age, retirementAge, ageOfStress);
  }

  var userData = chartData['projections']['user'];
  var premiumUserData = chartData['projections']['target'];

  var userStressData = chartData['stress_tests']['user'][stressIndex];
  var premiumStressData = chartData['stress_tests']['futureadvisor'][stressIndex];

  var stressTestTitle = userStressData['name'];

  var userChange = userStressData['portfolioChange'];
  var premiumUserChange = premiumStressData['portfolioChange'];

  var stressedUserData = _recalculateDataPoints(userData, ageOfStress - age, userChange);
  var stressedPremiumData = _recalculateDataPoints(premiumUserData, ageOfStress - age, premiumUserChange);

  var config = _generateChartConfigUtil(stressedUserData, stressedPremiumData, stressTestTitle, age, retirementAge, ageOfStress);

  return config;
}

var _generateBasicChart = function(chartData, age, retirementAge, ageOfStress){
  return _generateChartConfigUtil(chartData['projections']['user'], chartData['projections']['target'], 'All is Well', age, retirementAge, ageOfStress);
}

var _calculateLosses = function(data, age, ageOfStress){
  var a = ageOfStress - age;
  var b = a - 1;
  var change = data[a] - data[b];
  var percentageChange = ((Math.abs(data[a]) - Math.abs(data[b])) / Math.abs(data[a])) * 100
  var symbol = change < 0 ? '-' : '';
  return [Math.abs(change).toLocaleString(), Math.round(percentageChange * 100) / 100, symbol];

}

var _generateChartConfigUtil = function(userData, premiumUserData, stressTestTitle, age, retirementAge, ageOfStress) {

  var userLoss = _calculateLosses(userData, age, ageOfStress);
  var FALoss = _calculateLosses(premiumUserData, age, ageOfStress);

  var config = {
          chart: {
              type: 'area',
              zoomType: 'x',
              events: {
                  load: function () {
                      var userLabel = this.renderer.label('Your Portfolio: ' + userLoss[2] + '$' + userLoss[0] + ' (' + userLoss[1] + '%) ');
                      var FALabel = this.renderer.label('FutureAdvisor: ' + FALoss[2] + '$' + FALoss[0] + ' (' + FALoss[1] + '%) ');
                      var title = this.renderer.label('Asset Changes Post Stress Event')
                      .css({
                          width: '380px',
                          height: '500px',
                          fontSize: '15px'
                      })
                      .attr({
                          'stroke': 'silver',
                          'stroke-width-bottom': 1,
                          'r': 5,
                          'paddingTop': 30
                      });

                      var yAdjust = 80;
                      var xAdjust = 190;

                      if(stressTestTitle != 'All is Well') {
                        userLabel.add();
                        FALabel.add();
                        title.add();

                        userLabel.align(Highcharts.extend(userLabel.getBBox(), {
                            align: 'left',
                            x: xAdjust, // offset
                            verticalAlign: 'top',
                            y: 46 + yAdjust // offset
                        }), null, 'spacingBox');
                        FALabel.align(Highcharts.extend(FALabel.getBBox(), {
                            align: 'left',
                            x: xAdjust, // offset
                            verticalAlign: 'top',
                            y: 65 + yAdjust // offset
                        }), null, 'spacingBox');

                        title.align(Highcharts.extend(FALabel.getBBox(), {
                            align: 'left',
                            x: xAdjust, // offset
                            verticalAlign: 'top',
                            y: 23 + yAdjust // offset
                        }), null, 'spacingBox');
                      }

                  }
              },
          },
          title: {
              text: stressTestTitle
          },
          xAxis: {
            title: {
              text: 'Age'
            },
            categories: _getYearSeries(age, (userData.length + age)),
            labels: {
              step: 2,
              maxStaggerLines: 1,
            },
          },
          yAxis: {
            title: {
              text: 'Projected Assets'
            },
            labels: {
              format: '${value:,.0f}',
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
            data: premiumUserData,
            color: '#4caf50'
          }, {
            name: 'Your Holdings',
            data: userData,
            color: '#f57c00'
          }],
          tooltip: {
            pointFormat: '${point.y:,.0f}',
          }
  };

  return config;

}

var _recalculateDataPoints = function(data, yearOfChange, change){
  var adjustedData = [];
  for (var i = 0; i < data.length; ++i) {
    if (i < yearOfChange) {
      adjustedData.push(parseInt(data[i]));
    } else if (i === yearOfChange) {
      adjustedData.push(parseInt(data[i-1] * ( (100 + change) / 100)));
    } else {
      let percentageChange = (data[i] - data[i - 1]) / data[i - 1];
      adjustedData.push(parseInt(adjustedData[i-1] * (1 + percentageChange)));
    }
  }
  return adjustedData;
}

var _getYearSeries = function(startYear, endYear){
  var years = [];

  for (var i = startYear; i < endYear + 1; ++i) {
    years.push(i)
  }
  return years;
}
