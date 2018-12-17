import React, { Component } from "react";
// import "./Test.scss";
import { connect } from "react-redux";

import { fetchCart, addProduct } from "../../actions/CartAction";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.fetchCart("5c17fc54e4b0ba0232be8c96");

    let productFake = { xid: "b1c2d3c7b0", productPrice: 5699 };

    this.props.addProduct(productFake);
  }

  render() {
    return (
      <div className="Test">
        <p>Redux test -</p>
        {/* {JSON.stringify(this.props.cart.cart_id)} */}
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   console.log(state); // state
//   return { cart: state.cartReducer.cart };
// };
export default connect(
  null,
  { fetchCart, addProduct }
)(Test);
