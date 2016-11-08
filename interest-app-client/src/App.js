import React, { Component } from 'react';
import './App.css';

let idCounter = 0;
let exchangeCounter = 0;

class ExchangeSelector extends Component {
  render() {
    return (
      <select>
        { this.props.rates.map(rate => 
          <option value={ rate.currencyCode } key={exchangeCounter++}>{ rate.currencyCode }</option>
        )}
      </select>
    )
  }
}

export default class App extends Component {
  render() {
    const { store } = this.props; //Plan to change this...


    return (
      <div>
        <div>
          <h1>Enter value to calculate</h1>
          <input type="value"/>
        </div>
        <div>
          <h1>User slide to select interest rate</h1>
          <input id="test" type="range" min="0" max="100"/>
        </div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_ROW',
            id: idCounter++
          });
        }}>
        Add Row
        </button>
        <ul>
          { this.props.rows.map(row => 
            <li key={row.id} onClick={() => {
              store.dispatch({
                type: 'CHANGE_ROW_CURRENCY',
                id: row.id,
                currencyCode: 'GBP'
              });
              }}
              style={{ textDecoration: row.currencyCode === 'GBP' ?
                'line-through' :
                'none'
              }}>
              {row.currencyCode}
            </li>
          )}
        </ul>
          <ExchangeSelector rates={this.props.exchangeRates}/>
      </div>  
    );
  }
}