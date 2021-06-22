import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery';
import 'popper.js';
import LangState from './context/lang';

ReactDOM.render(
      <LangState>
        <App />
      </LangState>,
    document.getElementById('root')
  );

reportWebVitals();
