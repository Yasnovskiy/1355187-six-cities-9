import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { offers } from './mock/offers';
import { Offers } from './types/offers';

ReactDOM.render(
  <React.StrictMode>
    <App
      offers = {offers as Offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
