import 'modern-normalize';
import 'overlayscrollbars/overlayscrollbars.css';

import './styles/animate.css';
import './styles/global.css';

import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store.js';
import App from './components/App/App.jsx';
import './config/i18n.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
