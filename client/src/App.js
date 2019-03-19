import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Cart from "./components/Cart";
import Error from "./components/Error/Error";
import Seller from './components/Seller'
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/carrito" component={Cart} />
            <Route path="/vendedor" component={Seller} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
