import 'react-app-polyfill/ie11';

/*import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/fn/array/find';
import 'core-js/fn/array/includes';
import 'core-js/fn/number/is-nan';*/

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import App from './App'
import { Provider } from 'react-redux'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
