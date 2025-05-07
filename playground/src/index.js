import React from 'react';
import ReactDOM from 'react-dom';
import 'react-side-sheet-pro/dist/index.css';
import './index.css';
import App from './App.tsx';
import * as serviceWorker from './serviceWorker';
import { SideSheet } from 'react-side-sheet-pro';

ReactDOM.render(
  <React.StrictMode>
    <SideSheet.Provider configuration={{ side: 'right' }}>
      <App />
    </SideSheet.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
