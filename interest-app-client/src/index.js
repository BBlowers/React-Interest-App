import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';
import reducer from './reducer';
const fetchedExchangeRates = require('../../exchangeRates');

const store = createStore(reducer);

store.dispatch({
  type: 'SET_EXCHANGE_RATES',
  fetchedExchangeRates: fetchedExchangeRates
});

const render = () => {
  ReactDOM.render(
    <App rows={store.getState().rows} exchangeRates={store.getState().exchangeRates} store={store}/>, //Plan to change this
    document.getElementById('root')
  )
};

store.subscribe(render);
render();
