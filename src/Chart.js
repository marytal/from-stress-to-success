
import React, { Component } from 'react';
import generateChartConfig from './chartHelper';


export default class Chart extends Component {
  render() {
    return (
      <ReactHighcharts config = {generateChartConfig(chartData, age, 45, retirementAge, 18)}></ReactHighcharts>
    );
  }
}

var Highcharts = require('highcharts');

var retirementAge = 60;

// Expects that Highcharts was loaded in the code.
var ReactHighcharts = require('react-highcharts/bundle/highcharts');

var chartData = {'projections':{'user':[11823.5,21876.34,33119.94,44143.78,55884.4,69400.59,83338.15,97850.74,112159.49,128110.52,142122.57,157018.35,177223.44,200850.4,224611.65,242443.51,253862.05,274847.63,313373.71,341185.47,359861.55,385551.82,412336.3,440257.64,469360.17,499689.88,531294.51,564223.65,598528.76,634263.27,671482.65,710244.48,750608.54,792636.89,836393.95,881946.6,929364.26,978719.01,1030085.66],'target':[11823.5,22530.45,33661.0,45466.37,58367.81,72131.72,87023.24,103480.62,121385.11,140093.0,159742.25,181042.98,204219.43,229247.93,257082.76,285553.82,314160.05,348239.05,384714.69,419379.91,458156.41,497915.47,544527.91,597332.48,651475.92,709516.5,774147.46,833319.23,898419.98,973147.94,1054191.59,1137705.8,1221122.59,1310353.81,1393995.51,1484355.52,1590821.95,1691710.53,1810497.68]},'recommended_portfolio':[{'symbol':'IVV','name':'iShares Core S\u0026P 500 ETF','ratio':0.10674,'amount':1261.99518},{'symbol':'VEA','name':'Vanguard Tax-Managed International Fund','ratio':0.27364,'amount':3235.32383},{'symbol':'SCHZ','name':'Schwab US Aggregate Bond ETF','ratio':0.16,'amount':1891.76},{'symbol':'SCHE','name':'Schwab Emerging Markets Equity ETF','ratio':0.15496,'amount':1832.15999},{'symbol':'VNQ','name':'Vanguard REIT Index Fund','ratio':0.126,'amount':1489.761},{'symbol':'IVE','name':'iShares S\u0026P 500 Value ETF','ratio':0.17867,'amount':2112.5}],'stress_tests':{'user':[{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EUCPIUP','name':'Rising Inflation in Europe','portfolioChange':3.677550919962027},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USCPIUP','name':'Rising Inflation in the US','portfolioChange':3.3315156638095567},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USYC_UP','name':'Rising Interest Rates in the US','portfolioChange':3.268145332427091},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USD_DN','name':'Weakening US Dollar','portfolioChange':2.477465200441229},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EUYC_UP','name':'Rising Interest Rates in Europe','portfolioChange':1.3123368789455128},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'SUMMER03','name':'Summer of 2003','portfolioChange':0.7166621233308936},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_JPYC_UP','name':'Rising Interest Rates in Japan','portfolioChange':0.36792999080573635},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_JPCPIUP','name':'Rising Inflation in Japan','portfolioChange':0.2946349015453758},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MSGOLD_dn','name':'Price of gold decreases','portfolioChange':-0.4065578756385065},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MSOIL_dn','name':'Price of oil decreases','portfolioChange':-1.2011648245177873},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_JAPAN','name':'Stock Market Drop in Japan','portfolioChange':-6.8502648864011935},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EUCRDUP','name':'Widening Credit Spreads Europe','portfolioChange':-7.393150190958004},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_WORLD','name':'Global Stock Market Drop','portfolioChange':-8.449038307271657},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EURO','name':'European Stock Market Drop','portfolioChange':-8.971523043721254},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USCRDUP','name':'Widening Credit Spreads in the US','portfolioChange':-9.371217867200977},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_US','name':'Stock Market Drop US','portfolioChange':-9.583848323726258},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MSVIX_up','name':'Increased Stock Market Volatility','portfolioChange':-10.240234276805872},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'RAPID_DF','name':'Rapid Deflation','portfolioChange':-10.354378671376976},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'SLOW_DF','name':'Slow Deflation','portfolioChange':-12.614611925956215}],'futureadvisor':[{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EUCPIUP','name':'Rising Inflation in Europe','portfolioChange':1.1403893161111938},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USCPIUP','name':'Rising Inflation in the US','portfolioChange':1.0024182024314998},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USYC_UP','name':'Rising Interest Rates in the US','portfolioChange':0.9960652285873614},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USD_DN','name':'Weakening US Dollar','portfolioChange':0.7810366019182426},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EUYC_UP','name':'Rising Interest Rates in Europe','portfolioChange':0.4162264796802977},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_JPYC_UP','name':'Rising Interest Rates in Japan','portfolioChange':0.12795099689802888},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'SUMMER03','name':'Summer of 2003','portfolioChange':0.11420786443998904},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_JPCPIUP','name':'Rising Inflation in Japan','portfolioChange':0.08821798374180392},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MSGOLD_dn','name':'Price of gold decreases','portfolioChange':-0.13055167459250705},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MSOIL_dn','name':'Price of oil decreases','portfolioChange':-0.39690955908040654},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_JAPAN','name':'Stock Market Drop in Japan','portfolioChange':-1.9511707857319611},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EUCRDUP','name':'Widening Credit Spreads Europe','portfolioChange':-2.188137013283022},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_WORLD','name':'Global Stock Market Drop','portfolioChange':-2.4499137014391033},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_EURO','name':'European Stock Market Drop','portfolioChange':-2.5573848226925913},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_US','name':'Stock Market Drop US','portfolioChange':-2.763185217581985},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MS_USCRDUP','name':'Widening Credit Spreads in the US','portfolioChange':-2.81025804653122},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'MSVIX_up','name':'Increased Stock Market Volatility','portfolioChange':-2.9500720950637915},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'RAPID_DF','name':'Rapid Deflation','portfolioChange':-3.306349678380829},{'@type':'com.blackrock.ebiz.webtools.server.api.domain.risk.StressTest','key':'SLOW_DF','name':'Slow Deflation','portfolioChange':-3.772203126123946}]}}
var age = 29;

var getStressIndexes = function(chartData){
  var userStressArray = chartData['stress_tests']['user'];
  var premiumUserStressArray = chartData['stress_tests']['futureadvisor'];
  var dataLength = userStressArray.length;
  var diffs = [];

  // makes an array of all the absolute diffs and their indexes
  for(var i = 0; i < dataLength; i++){
    var a = userStressArray[i]['portfolioChange'];
    var b = premiumUserStressArray[i]['portfolioChange'];
    var diff = Math.abs(a - b);
    diffs.push([diff, i]);
  }

  // sorts the array from smallest diff to largest
  diffs.sort(function(a, b){
    if(a[0] === b[0]) {
      return 0;
    } else {
      return (a[0] < b[0]) ? -1 : 1;
    }
  });

  // returns the indexes of the 5 largest diffs
  var indexes = diffs.slice(-5).map(function(data) {
    return data[1];
  });

  return indexes;
}
