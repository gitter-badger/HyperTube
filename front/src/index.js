import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

// import App from './containers/App';
import './styles/index.css';
import router from './router'

ReactDOM.render(
  <Router
      history={browserHistory}
      routes={router}
  />,
  document.getElementById('root')
);
