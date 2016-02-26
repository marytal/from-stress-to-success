import React, { Component } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Chart from './Chart';

// fixes weird bug in mui library
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  fontSize: 10,
};

export default class ChartContaier extends Component {

  render() {
    let { chartData } = this.props;
    let indices = getStressIndices(chartData)
    let self = this;

    return(
      <div>
        <Tabs>
          <Tab style={styles} label='No Impacts' >
            <Chart chartData={chartData} scenarioIndex={-1} />
          </Tab>
          { indices.map(function(index) {
            return <Tab style={styles} label={getTitle(index, chartData)} >
              <Chart chartData={chartData} scenarioIndex={index} />
            </Tab>
          })}
        </Tabs>
      </div>
    )
  }
}

var getStressIndices = function(chartData){
  if (Object.keys(chartData).length === 0) return [];

  var userStressArray = chartData['stress_tests']['user'];
  var premiumUserStressArray = chartData['stress_tests']['futureadvisor'];

  var changes = userStressArray.map(function(change, index) {
    return [change['portfolioChange'], index];
  })

  changes.sort(function(a, b){
    return b[0] - a[0];
  });

  // returns the Indices of the 5 largest diffs
  return changes.slice(-5).map(function(data) {
    return data[1];
  });
}

var getTitle = function(index, chartData){
  return chartData['stress_tests']['user'][index]['name'];
}
