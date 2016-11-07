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

  const inputBefore = {
    currencyCode: 'USD',
    value: 1000,
    interest: 1
  };
  const action = {
    type: 'CHANGE_MAIN_CURRENCY',
    currencyCode: 'GBP'
  }
  
  const inputAfter = {
    currencyCode: 'GBP',
    value: 1000,
    interest: 1
  };

  deepFreeze(inputBefore);
  deepFreeze(inputAfter);

  expect(
    reducer(inputBefore, action)
  ).toEqual(inputAfter);
})

it('handles CHANGE_MAIN_VALUE', () => {

  const inputBefore = {
    currencyCode: 'USD',
    value: 1000,
    interest: 1
  };
  const action = {
    type: 'CHANGE_MAIN_VALUE',
    value: 50
  }
  
  const inputAfter = {
    currencyCode: 'USD',
    value: 50,
    interest: 1
  };

  deepFreeze(inputBefore);
  deepFreeze(inputAfter);

  expect(
    reducer(inputBefore, action)
  ).toEqual(inputAfter);
})

it('handles CHANGE_MAIN_INTEREST', () => {

  const inputBefore = {
    currencyCode: 'USD',
    value: 1000,
    interest: 1
  };
  const action = {
    type: 'CHANGE_MAIN_INTEREST',
    interest: 20
  }
  
  const inputAfter = {
    currencyCode: 'USD',
    value: 1000,
    interest: 20
  };

  deepFreeze(inputBefore);
  deepFreeze(inputAfter);

  expect(
    reducer(inputBefore, action)
  ).toEqual(inputAfter);
})

// it('handles ADD_ROW', () => {

//   const inputBefore = {
//     currencyCode: 'USD',
//     value: 1000,
//     interest: 1
//   };
//   const action = {
//     type: 'ADD_ROW',
//     interest: 20
//   }
  
//   const inputAfter = {
//     currencyCode: 'USD',
//     value: 1000,
//     interest: 20
//   };

//   deepFreeze(inputBefore);
//   deepFreeze(inputAfter);

//   expect(
//     reducer(inputBefore, action)
//   ).toEqual(inputAfter);
// })