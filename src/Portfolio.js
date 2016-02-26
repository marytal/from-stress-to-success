import React, { Component } from 'react';

import testData from './testData';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      currentSymbol: '',
      currentShares: 0,
      currentPricePerShare: 0,
      validSymbol: false,
    }

    this._addPosition = this._addPosition.bind(this)
    this._changeCode = this._changeCode.bind(this)
    this._changeShares = this._changeShares.bind(this)
  }

  _removePosition(i) {
    this.state.positions.splice(i, 1);
    this.forceUpdate();
  }

  _addPosition() {
    // do some validation
    let position = {
      symbol: this.state.currentSymbol,
      shares: this.state.currentShares,
      pricePerShare: this.state.currentPricePerShare,
      total: this.state.currentPricePerShare * this.state.currentShares
    }
    this.state.positions.push(position);
    this.setState({
      currentSymbol: '',
      currentShares: 0,
      currentPricePerShare: 0,
    });
  }

  _numberToCurrency(num) {
    var currency = `$${num.toFixed(2)}`
    return currency
  }

  _changeCode(event) {
    var self = this;
    var symbol = event.target.value

    // update price per share
    var queryString = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`

    var success = function(data) {
      var pricePerShare = data.query.results.quote.Ask;
      if (pricePerShare) {
        self.setState({
          currentSymbol: symbol,
          currentPricePerShare: Number(pricePerShare),
          validSymbol: true,
        })
      } else {
        self.setState({
          currentSymbol: symbol,
          currentPricePerShare: 0,
          validSymbol: false
        })
      }
    }

    $.get({
      url: queryString,
      success
    })
  }

  _changeShares(event) {
    // update total
    this.setState({currentShares: event.target.value });
  }

  render() {
    let positions = this.state.positions;
    let self = this;

    return (
      <div>
        Enter your portfolio:

        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Position</TableHeaderColumn>
              <TableHeaderColumn>Shares</TableHeaderColumn>
              <TableHeaderColumn>Price per Share</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn>+/-</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { positions.map(function(position, i) {
              let { symbol, shares, pricePerShare, total} = position;
              return (
                <TableRow key={i}>
                  <TableRowColumn>{ symbol }</TableRowColumn>
                  <TableRowColumn>{ shares }</TableRowColumn>
                  <TableRowColumn>{ self._numberToCurrency(pricePerShare) }</TableRowColumn>
                  <TableRowColumn>{ self._numberToCurrency(total) }</TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton mini={true} onClick={self._removePosition.bind(self, i)}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              )
            })}
            <TableRow>
              <TableRowColumn><TextField hintText="Enter ticker symbol" onChange={this._changeCode}></TextField></TableRowColumn>
              <TableRowColumn><TextField hintText="How many shares do you own?" onChange={this._changeShares}></TextField></TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText='price per share'
                  disabled={true}
                  value={this._numberToCurrency(this.state.currentPricePerShare)}>
                </TextField>
              </TableRowColumn>
              <TableRowColumn>
              <TextField
                hintText='total'
                disabled={true}
                value={this._numberToCurrency(this.state.currentShares * this.state.currentPricePerShare)}>
                </TextField>
              </TableRowColumn>
              <TableRowColumn>
                <FloatingActionButton secondary={true} mini={true} disabled={!this.state.validSymbol} onClick={this._addPosition}>
                  <ContentAdd />
                </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        <RaisedButton secondary={true} label="Submit" onClick={this.props.updateChartData.bind(null, testData)}/>

      </div>
    );
  }
}


        // { this.state.currentShares }
        // { this.state.currentSymbol }
        // { JSON.stringify(this.state.positions) }
