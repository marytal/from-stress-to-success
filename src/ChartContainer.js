import React, { Component } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Chart from './Chart';

// fixes weird bug in mui library
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const styles = {
  fontSize: 12,
};

function handleActive(tab) {
  console.log(tab)
  alert(`A tab with this route property ${tab.props.route} was activated.`);
}

export default class ChartContaier extends Component {

  render() {
    let { chartData } = this.props;
    let indices = getStressIndices(chartData)
    let self = this;

    return(
      <div>
        <Tabs>
          <Tab style={styles} label="Item One" >
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
  if (Object.keys(chartData).length === 0) {
    console.log("THIS IS STILL 0")
    return [];
  }
  var userStressArray = chartData['stress_tests']['user'];
  var premiumUserStressArray = chartData['stress_tests']['futureadvisor'];
  var diffs = [];

  // makes an array of all the absolute diffs and their Indices
  for(var i = 0; i < userStressArray.length; i++){
    var a = userStressArray[i]['portfolioChange'];
    var b = premiumUserStressArray[i]['portfolioChange'];
    var diff = Math.abs(a - b);
    diffs.push([diff, i]);
  }

  console.log("I am being called")
  // sorts the array from smallest diff to largest
  diffs.sort(function(a, b){
    return a[0] - b[0];
  });

  // returns the Indices of the 5 largest diffs
  var indices = diffs.slice(-5).map(function(data) {
    return data[1];
  });

  return indices;
}

var getTitle = function(index, chartData){
  return chartData['stress_tests']['user'][index]['name'];
}

/*          <Tab
            label="onActive"
            route="/home"
            onActive={handleActive}
          >
            <div>
              <h2 style={styles.headline}>Tab Three</h2>
              <p>
                This is a third example tab.
              </p>
            </div>
          </Tab>
*/

