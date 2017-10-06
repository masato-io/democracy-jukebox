import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, hashHistory, browserHistory } from 'react-router-dom'
import App from './components/App';
import store from './store'

const app = document.getElementById('app')

window.server = 'http://127.0.0.1:3000';
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,app
  );
});


