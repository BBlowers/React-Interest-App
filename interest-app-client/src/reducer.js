import { combineReducers } from 'redux';

const row = (state, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return {
        id: action.id,
        currencyCode: 'USD'
      }
    case 'CHANGE_ROW_CURRENCY':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        currencyCode: action.currencyCode 
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
      console.log(action);
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
const mainCurrencyCode = (state = 'USD', action) => {
  if (action.type === 'CHANGE_MAIN_CURRENCY') {
    return action.mainCurrencyCode
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
  mainCurrencyCode,
  exchangeRates
});