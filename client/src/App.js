import { Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import history from './history';
import Cart from "./components/Cart";
import Errors from "./components/Error/Error";
import Seller from "./components/Seller";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>           
            <Route exact path="/carrito" component={Cart} />
            <Route path="/carrito/vendedor" component={Seller} />
            <Route component={Errors} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
