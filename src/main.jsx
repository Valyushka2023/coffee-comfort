// import 'overlayscrollbars/overlayscrollbars.css';
// import './styles/global.css';
// import './styles/variables.css';
// import React, { Suspense } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { I18nextProvider } from 'react-i18next';

// import store from './redux/store.js';
// import App from './components/App/App.jsx';
// import i18n from './config/i18n.js';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     {/* ✅ КРИТИЧНЕ ВИПРАВЛЕННЯ: Обгортаємо додаток в I18nextProvider */}
//     <I18nextProvider i18n={i18n}>
//       <Provider store={store}>
//         <Suspense fallback={<div>Loading...</div>}>
//           <App />
//         </Suspense>
//       </Provider>
//     </I18nextProvider>
//   </React.StrictMode>
// );

import 'modern-normalize'; // Краще імпортувати першим
import 'overlayscrollbars/overlayscrollbars.css';
import './styles/variables.css';
import './styles/global.css';

import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// Якщо використовуєш persist
// import { persistor } from './redux/store.js';
// Додай експорт persistor у store.js

import store from './redux/store.js';
import App from './components/App/App.jsx';
import './config/i18n.js'; // Достатньо просто імпортувати конфіг

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Якщо використовуєш redux-persist, додай PersistGate */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
