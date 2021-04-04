import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { BrowserRouter as Router } from "react-router-dom";
import 'fontsource-roboto';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CssBaseline } from '@material-ui/core';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <CssBaseline>
          <App />
        </CssBaseline>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
