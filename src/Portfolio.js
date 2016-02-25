import React, { Component } from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';

export class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = { positions: [], currentCode: "", currentShares: 0, currentPricePerShare: "", currentTotal: "" }

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
      pos: this.state.currentCode,
      shares: this.state.currentShares
    }
    this.state.positions.push(position);
    this.setState({
      currentCode: "",
      currentShares: ""
    });
  }

  _changeCode(event) {
    // update price per share
    this.setState({currentCode: event.target.value });
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
              let { pos, shares, pricePerShare, total} = position;
              return (
                <TableRow key={i}>
                  <TableRowColumn>{ pos }</TableRowColumn>
                  <TableRowColumn>{ shares }</TableRowColumn>
                  <TableRowColumn>{ pricePerShare }</TableRowColumn>
                  <TableRowColumn>{ total }</TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton mini={true} onClick={self._removePosition.bind(self, i)}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              )
            })}
            <TableRow>
              <TableRowColumn><TextField hintText="position" onChange={self._changeCode}></TextField></TableRowColumn>
              <TableRowColumn><TextField hintText="shares" onChange={self._changeShares}></TextField></TableRowColumn>
              <TableRowColumn><TextField hintText="price per share" disabled={true}></TextField></TableRowColumn>
              <TableRowColumn><TextField hintText="total" disabled={true}></TextField></TableRowColumn>
              <TableRowColumn>
                <FloatingActionButton secondary={true} mini={true} onClick={self._addPosition}>
                  <ContentAdd />
                </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        { this.state.currentShares }
        { this.state.currentCode }
        { JSON.stringify(this.state.positions) }
      </div>
    );
  }
}


