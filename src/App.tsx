import React from 'react';
import {I18nManager} from 'react-native';
import {Provider} from 'react-redux';

import store from './redux/store';

import AppNavigation from './navigations';

I18nManager.allowRTL(false);

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default App;
