import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './firebase'
import App from './App';
import configureStore from './store';

// create a redux store with our reducer above and middleware
let store = configureStore();

const renderApp = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./App', () => {
    // in all other cases - re-require App manually
    renderApp(require('./App'));
  });
}
