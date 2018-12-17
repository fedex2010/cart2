import React, { Component } from "react";
// import "./test.scss";
import { connect } from "react-redux";
import { fetchCart } from "../../actions/cartAction";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cart: {}
    };
  }
  componentWillMount() {
    this.props.fetchCart();
  }

  render() {
    return (
      <div className="Test">
        <p>Component Test</p>
      </div>
    );
  }
}
export default connect(
  null,
  { fetchCart }
)(Test);
