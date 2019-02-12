import React, { Component } from "react";
import { connect } from "react-redux";
import Cart from "./components/Cart";
import Error from "./components/Error/Error";
import Seller from './components/Seller'

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const params = new URLSearchParams( window.location.search );
    this.state.path = params.get('redirect') || "cart";
  }

  render() {
    if( this.state.path == "error" ){
      return < Error />
    }else if( this.state.path == "seller" ){
      return < Seller />
    }else{
      return < Cart />
    }
  }
}

export default connect()(App)

