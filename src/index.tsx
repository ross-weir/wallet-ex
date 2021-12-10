import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { initI18n } from './i18n';
import 'semantic-ui-css/semantic.min.css';

import './App.css';

initI18n();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
