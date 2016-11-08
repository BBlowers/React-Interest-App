import React, { Component } from 'react';
import './App.css';

let idCounter = 0;
let exchangeCounter = 0;

class CurrencySelector extends Component {
  render() {
    return (
      <select onChange={(event) => {
        this.props.store.dispatch({
          type: 'CHANGE_ROW_CURRENCY',
          id: this.props.row.id,
          currencyCode: event.target.value
        });
      }} value={this.props.row.currency.code}>
        { this.props.rates.map(rate =>
            <option value={ rate.currencyCode } key={rate.currencyCode}>{ rate.currencyCode }</option>
        )}
      </select>
    )
  }
}

class MainCurrencySelector extends Component {
  render() {
    return (
      <div>
        <h1>Select main currency</h1>
        <select onChange={(event) => {
          this.props.store.dispatch({
            type: 'CHANGE_MAIN_CURRENCY',
            mainCurrencyCode: event.target.value
          });
        }} value={this.props.mainCurrency.code}>
          { this.props.rates.map(rate =>
              <option value={ rate.currencyCode } key={rate.currencyCode}>{ rate.currencyCode }</option>
          )}
        </select>
      </div>
    )
  }
}

class MainValueInput extends Component {
  render() {
    return (
      <div>
        <h1>Enter value to calculate</h1>
        <input type="value" onChange={(event) => {
          this.props.store.dispatch({
            type: 'CHANGE_MAIN_VALUE',
            mainValue: event.target.value
          });
        }} value={this.props.mainValue} />
      </div>
    )
  }
}

class MainInterestSlider extends Component {
  render() {
    return (
      <div>
        <h1>User slide to select interest rate</h1>
        <input id="test" type="range" min="0" max="100" onChange={(event) => {
          this.props.store.dispatch({
            type: 'CHANGE_MAIN_INTEREST',
            mainInterest: event.target.value
          })
        }} value={this.props.mainInterest}/>
        <h2>{this.props.mainInterest}%</h2>
      </div>
    )
  }
}

class MainValueWithInterest extends Component {
  render() {
    const { 
      mainValue,
      mainInterest
    } = this.props; //Plan to change this...

    return (
      <div>
        <h2>Interest per year { mainValue * (mainInterest/100) }</h2>
        <h2>Interest per month { mainValue * (mainInterest/100)/12 }</h2>
      </div>
    )
  }
}

class AddRowButton extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          this.props.store.dispatch({
            type: 'ADD_ROW',
            id: idCounter++
          });
        }}>
        Add Row
        </button>
      </div>
    )
  }
}

class AdditionalRows extends Component {
  render() {
    return (
      <ul>
        { this.props.rows.map(row => 
          <li key={row.id}>
            <CurrencySelector store={this.props.store} row={row} rates={this.props.exchangeRates}/>
            <p>{row.currency.name}</p>
            <p>Exchanged value {(row.currency.unitsPerUSD/this.props.mainCurrency.unitsPerUSD)*this.props.mainValue}</p>
            <p>Interest per month {(row.currency.unitsPerUSD/this.props.mainCurrency.unitsPerUSD)*this.props.mainValue*this.props.mainInterest/1200}</p>
            <p>Interest per year {(row.currency.unitsPerUSD/this.props.mainCurrency.unitsPerUSD)*this.props.mainValue*this.props.mainInterest/100}</p>
          </li>
        )}
      </ul>
    )
  }
}

export default class App extends Component {
  render() {
    const { store } = this.props; //Plan to change this...
    return (
      <div>
        <MainValueInput store={store} mainValue={this.props.mainValue}/>
        <MainInterestSlider store={store} mainInterest={this.props.mainInterest}/>          
        <MainCurrencySelector mainCurrency={this.props.mainCurrency} store={store} rates={this.props.exchangeRates}/>
        <MainValueWithInterest mainValue={this.props.mainValue} mainInterest={this.props.mainInterest}/>
        <AddRowButton store={store}/>
        <AdditionalRows store={store} rows={this.props.rows} exchangeRates={this.props.exchangeRates} mainValue={this.props.mainValue} mainCurrency={this.props.mainCurrency}mainInterest={this.props.mainInterest}/>
      </div>  
    );
  }
}