import React, { Component } from "react";
// import "./Test.scss";
import { connect } from "react-redux";
import { fetchCart } from "../../actions/CartAction";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.fetchCart("5bbe3e53e4b093b426db56b2");
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
  { fetchCart }
)(Test);
