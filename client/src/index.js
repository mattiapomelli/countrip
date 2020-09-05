import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WorldProvider from './context/WorldContext'

ReactDOM.render(
  <React.StrictMode>
    <WorldProvider>
    <App />
    </WorldProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
