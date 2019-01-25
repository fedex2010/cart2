import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router';

import App from './App'
import VendedorPage from './pages/VendedorPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/reactcart" component={App} exact />
        <Route path="/carrito/vendedor" component={VendedorPage} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root