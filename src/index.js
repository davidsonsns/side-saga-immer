import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { AppContainer } from 'react-hot-loader';

import './firebase';
import App from './App';
import configureStore from './store';

// create a redux store with our reducer above and middleware
let store = configureStore();

const renderApp = Component => {
  render(
    <Provider store={store} key={Math.random()}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept();
  // './App', () => {
  //   console.log('TCL: NextApp', NextApp);
  //   const NextApp = require('./App').default;
  //   renderApp(NextApp);
  // }
}
