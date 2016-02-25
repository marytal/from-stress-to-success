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


var _generateChartConfigUtil = function(userData, premiumUserData, stressTestTitle, age, retirementAge) {

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
