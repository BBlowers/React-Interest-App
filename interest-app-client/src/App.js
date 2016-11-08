import React, { Component } from 'react';
import './App.css';

let idCounter = 0;

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
            <option value={ rate.currencyCode } key={ rate.currencyCode }>{ rate.currencyCode }</option>
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
              <option value={ rate.currencyCode } key={ rate.currencyCode }>{ rate.currencyCode }</option>
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
        }} value={ this.props.mainValue } />
      </div>
    )
  }
}

class MainInterestSlider extends Component {
  render() {
    return (
      <div>
        <h1>Use slide to select interest rate</h1>
        <input type="range" min="0" max="100" onChange={(event) => {
          this.props.store.dispatch({
            type: 'CHANGE_MAIN_INTEREST',
            mainInterest: event.target.value
          })
        }} value={ this.props.mainInterest }/>
        <h2>{ this.props.mainInterest }%</h2>
      </div>
    )
  }
}

class MainValueWithInterest extends Component {
  render() {
    const { 
      mainValue,
      mainInterest
    } = this.props;

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
    const { 
      store,
      mainValue,
      mainInterest,
      mainCurrency,
      exchangeRates,
      rows
    } = this.props;
    return (
      <table>
        <tr>
          <th>Currency code</th>
          <th>Currency name</th> 
          <th>Exchanged value</th>
          <th>Interest per month</th>
          <th>Interest per year</th>
        </tr>
        <tbody>
        { rows.map(row => 
          <tr key={row.id}>
            <td><CurrencySelector store={store} row={row} rates={exchangeRates}/>
            </td>
            <td>{row.currency.name}
            </td>
            <td>{(row.currency.unitsPerUSD/mainCurrency.unitsPerUSD)*mainValue}
            </td>
            <td>{(row.currency.unitsPerUSD/mainCurrency.unitsPerUSD)*mainValue*mainInterest/1200}
            </td>
            <td>{(row.currency.unitsPerUSD/mainCurrency.unitsPerUSD)*mainValue*mainInterest/100}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    )
  }
}

export default class App extends Component {
  render() {
    const { 
      store,
      mainValue,
      mainInterest,
      mainCurrency,
      exchangeRates,
      rows
    } = this.props;
    return (
      <div className="container">
        <MainValueInput store={ store } mainValue={ mainValue }/>
        <MainInterestSlider store={ store } mainInterest={ mainInterest }/>          
        <MainCurrencySelector mainCurrency={ mainCurrency } store={ store } rates={ exchangeRates }/>
        <MainValueWithInterest mainValue={ mainValue } mainInterest={ mainInterest }/>
        <AdditionalRows store={ store } rows={ rows } exchangeRates={ exchangeRates } mainValue={ mainValue } mainCurrency={ mainCurrency }mainInterest={ mainInterest }/>
        <AddRowButton store={ store }/>
      </div>  
    );
  }
}