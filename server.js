import express from 'express';
const app = express();

import { fetchedExchangeRates } from './exchangeRates';

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('interest-app-client/public'));
}

app.get('/api/exchangeRates', (req, res) => {
  res.json(exchangeRates);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});