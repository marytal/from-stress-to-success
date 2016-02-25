export default function generateChartConfig(chartData, age, ageOfStress, retirementAge, stressIndex) {

  var userData = chartData['projections']['user'];
  var premiumUserData = chartData['projections']['target'];

  var userStressData = chartData['stress_tests']['user'][stressIndex];
  var premiumStressData = chartData['stress_tests']['futureadvisor'][stressIndex];

  var stressTestTitle = userStressData['name'];

  var userChange = userStressData['portfolioChange'];
  var premiumUserChange = premiumStressData['portfolioChange'];

  var stressedUserData = _recalculateDataPoints(userData, ageOfStress - age, userChange);
  var stressedPremiumData = _recalculateDataPoints(premiumUserData, ageOfStress - age, premiumUserChange);

  var config = _generateChartConfigUtil(stressedUserData, premiumUserData, stressTestTitle, age, retirementAge);

  return config;
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

var _getYearSeries = function(startYear, endYear){
  var years = [];

  for (var i = startYear; i < endYear + 1; ++i) {
    years.push(i)
  }
  return years;
}
