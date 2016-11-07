import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {expect} from 'chai';
import {deepFreeze} from 'deep-freeze-strict'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


