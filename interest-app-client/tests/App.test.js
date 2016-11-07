import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import ReactTestUtils from 'react-addons-test-utils'
import deepFreeze from 'deep-freeze-strict'
import reducer from '../src/reducer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('handles CHANGE_MAIN_CURRENCY', () => {

  const stateBefore = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: []
  };
  const action = {
    type: 'CHANGE_MAIN_CURRENCY',
    mainCurrencyCode: 'GBP'
  }
  
  const stateAfter = {
    mainCurrencyCode: 'GBP',
    mainValue: 1000,
    mainInterest: 1,
    rows: []
  };

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    reducer(stateBefore, action)
  ).toEqual(stateAfter);
})

it('handles CHANGE_MAIN_VALUE', () => {

  const stateBefore = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: []
  };
  const action = {
    type: 'CHANGE_MAIN_VALUE',
    mainValue: 50
  }
  
  const stateAfter = {
    mainCurrencyCode: 'USD',
    mainValue: 50,
    mainInterest: 1,
    rows: []
  };

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    reducer(stateBefore, action)
  ).toEqual(stateAfter);
})

it('handles CHANGE_MAIN_INTEREST', () => {

  const stateBefore = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: []
  };
  const action = {
    type: 'CHANGE_MAIN_INTEREST',
    mainInterest: 20,
    rows: []
  }
  
  const stateAfter = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 20,
    rows: []
  };

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    reducer(stateBefore, action)
  ).toEqual(stateAfter);
})

it('handles ADD_ROW', () => {

  const stateBefore = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: []
  };
  const action = {
    type: 'ADD_ROW',
    id: 1
  }
  
  const stateAfter = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: [{
      id: 1,
      currencyCode: 'USD'
    }]
  };

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    reducer(stateBefore, action)
  ).toEqual(stateAfter);
})

it('handles CHANGE_ROW_CURRENCY', () => {

  const stateBefore = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: [{
      id: 1,
      currencyCode: 'USD'
    }]
  };
  const action = {
    type: 'CHANGE_ROW_CURRENCY',
    id: 1,
    currencyCode: 'GBP'
  }
  
  const stateAfter = {
    mainCurrencyCode: 'USD',
    mainValue: 1000,
    mainInterest: 1,
    rows: [{
      id: 1,
      currencyCode: 'GBP'
    }]
  };

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    reducer(stateBefore, action)
  ).toEqual(stateAfter);
})
