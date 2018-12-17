import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../../actions/cartAction";

class Test2 extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart) {
      console.log(nextProps.cart);
    }
  }

  render() {
    return (
      <div className="Test2">
        <p>result : {this.props.cart}</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  null,
  { fetchCart }
)(Test2);
