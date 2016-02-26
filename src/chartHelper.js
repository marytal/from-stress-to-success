export default function generateChartConfig(chartData, age, ageOfStress, retirementAge, stressIndex) {

  if (stressIndex === -1) {
    return _generateBasicChart(chartData, age, retirementAge);
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

  var config = _generateChartConfigUtil(stressedUserData, stressedPremiumData, stressTestTitle, age, retirementAge);

  return config;
}

var _generateBasicChart = function(chartData, age, retirementAge){
  return _generateChartConfigUtil(chartData['projections']['user'], chartData['projections']['target'], 'All is Well', age, retirementAge);
}


var _calculateLosses = function(data){
  var change = data[28] - data[27];
  var percentageChange = ((Math.abs(data[28]) - Math.abs(data[27])) / Math.abs(data[28])) * 100
  var symbol = change < 0 ? '-' : '';
  return [Math.abs(change).toLocaleString(), Math.round(percentageChange * 100) / 100, symbol];

}

var _generateChartConfigUtil = function(userData, premiumUserData, stressTestTitle, age, retirementAge) {

  var userLoss = _calculateLosses(userData);
  var FALoss = _calculateLosses(premiumUserData);

  var config = {
          chart: {
              type: 'area',
              zoomType: 'x',
              events: {
                  load: function () {
                      var userLabel = this.renderer.label('Your Portfolio: ' + userLoss[2] + '$' + userLoss[0] + ' (' + userLoss[1] + '%) ')
                      var FALabel = this.renderer.label('FutureAdvisor: ' + FALoss[2] + '$' + FALoss[0] + ' (' + FALoss[1] + '%) ')

                      if(stressTestTitle != 'All is Well') {
                        userLabel.add();
                        FALabel.add();

                        userLabel.align(Highcharts.extend(userLabel.getBBox(), {
                            align: 'left',
                            x: 120, // offset
                            verticalAlign: 'top',
                            y: 42 // offset
                        }), null, 'spacingBox');
                        FALabel.align(Highcharts.extend(FALabel.getBBox(), {
                            align: 'left',
                            x: 120, // offset
                            verticalAlign: 'top',
                            y: 65 // offset
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
            plotBands: {
              from: retirementAge - age,
              to: userData.length,
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
            data: premiumUserData
          }, {
            name: 'Your Holdings',
            data: userData
          }]
  };

  return config;

}

var _recalculateDataPoints = function(data, yearOfChange, change){
  var adjustedData = [];
  for (var i = 0; i < data.length; ++i) {
    if (i < yearOfChange) {
      adjustedData.push(data[i]);
    } else if (i === yearOfChange) {
      adjustedData.push(data[i-1] * ( (100 + change) / 100));
    } else {
      let percentageChange = (data[i] - data[i - 1]) / data[i - 1];
      adjustedData.push(adjustedData[i-1] * (1 + percentageChange));
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
