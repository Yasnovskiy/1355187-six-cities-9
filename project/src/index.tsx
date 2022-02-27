import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { offers } from './mock/offers';
import { Offers } from './types/offers';

// const Setting = {
//   OFFERS_COUNT: 5,
// };

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount = {offers.length}
      offers = {offers as Offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
