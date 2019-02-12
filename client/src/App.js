import config from "./config/config";

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
  }

  render() {  
    let {pathName} = this.props

    if( pathName == config.path_name.reactcart ){
      return < Cart />
    }else if( pathName == config.path_name.seller ){
      return < Seller />
    }else{
      return < Error />
    }
  }
}

const mapStateToProps = state => {
  return { 
    pathName: state.cartReducer.pathName
  };
};

export default connect( mapStateToProps )( App );

