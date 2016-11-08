import { combineReducers } from 'redux';
const fetchedExchangeRates = require('../../exchangeRates');

const row = (state, action) => {
  const isRate = (rate) => {
    return rate.currencyCode === action.currencyCode;
  }
  switch (action.type) {
    case 'ADD_ROW':
      return {
        id: action.id,
        currency: {
          currencyCode: "USD",
          name: "US Dollar",
          unitsPerUSD: 1.0000000000,
          USDPerUnit: 1.0000000000
        }
      }
    case 'CHANGE_ROW_CURRENCY':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        currency: fetchedExchangeRates.find(isRate)
      };
    default:
      return state;
  }
}

const rows = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [
        ...state,
        row(undefined, action)
      ];
    case 'CHANGE_ROW_CURRENCY':
      return state.map(r => row(r, action));
    default:
      return state;
  }
}

const mainValue = (state = 500, action) => {
  if (action.type === 'CHANGE_MAIN_VALUE') {
    return action.mainValue
  }
  return state;
}
const mainCurrency = (state = {}, action) => {
  const isRate = (rate) => {
    return rate.currencyCode === action.mainCurrencyCode;
  }
  if (action.type === 'CHANGE_MAIN_CURRENCY') {
    return fetchedExchangeRates.find(isRate)
  }
  return state;
}
const mainInterest = (state = 1, action) => {
  if (action.type === 'CHANGE_MAIN_INTEREST') {
    return action.mainInterest
  }
  return state;
}

const exchangeRates = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXCHANGE_RATES':
      if(action.fetchedExchangeRates) {
        return action.fetchedExchangeRates;
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  rows,
  mainValue,
  mainInterest,
  mainCurrency,
  exchangeRates
});