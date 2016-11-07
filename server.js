import express from 'express';
const app = express();

import { exchangeRates } from './exchangeRates';

app.set('port', (process.env.PORT || 3001));

app.get('/api/exchangeRates', (req, res) => {
  res.json(exchangeRates);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
