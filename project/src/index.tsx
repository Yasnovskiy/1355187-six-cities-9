import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  store  from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';

// надо удалить комментарий в 8 модуле ( делаю это для доступа )
store.dispatch(fetchOffersAction);
store.dispatch(checkAuthAction);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
