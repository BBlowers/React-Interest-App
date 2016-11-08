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
      }} value={this.props.row.currencyCode}>
        { this.props.rates.map(rate =>
            <option value={ rate.currencyCode } key={exchangeCounter++}>{ rate.currencyCode }</option>
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
        }} value={this.props.mainCurrencyCode}>
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
        <h2>{ mainValue * (1 + mainInterest/100) }/year</h2>
        <h2>{ mainValue * (1 + mainInterest/100)/12 }/month</h2>
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
            <p>{row.currencyCode}</p>
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
        <MainCurrencySelector mainCurrencyCode={this.props.mainCurrencyCode} store={store} rates={this.props.exchangeRates}/>
        <MainValueWithInterest mainValue={this.props.mainValue} mainInterest={this.props.mainInterest}/>
        <AddRowButton store={store}/>
        <AdditionalRows store={store} rows={this.props.rows} exchangeRates={this.props.exchangeRates}/>
      </div>  
    );
  }
}