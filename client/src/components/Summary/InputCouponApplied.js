import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import {addCoupon} from "../../actions/CartAction";

class InputCouponApplied extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

  _addCoupon(e){
      let cartId = Cookie.get("cartId");
      this.props.addCoupon(this.state.input,cartId);
  }

  _handleInput(e){
      let couponId = e.target.value;
      this.setState({ input: couponId });
  }

  _showError(){
    let classError = (this.props.err.cause && this.props.err.cause.code && this.props.err.cause.code === 400)? "error-msj" : "error-msj hide";
    return(<p className={classError}>Código de cupón inválido.</p>);
  }
 
  render() {
    return (
      <div className="InputCouponApplied">
        <div className="coupon-apply-form">
            {/*add class - form-control-error - to error input*/} 
            <input className="form-control form-control--sm" type="text" placeholder="Respetá mayúsculas y minúsculas" onChange={this._handleInput.bind(this)}  autoComplete="off" />
            {/*add class - button__is-loading - to loading button */}
            <button onClick={this._addCoupon.bind(this)} className="button--primary button--sm">Aplicar</button>
            {/*remove class - hide - to error message*/} 
            {this._showError()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return { err: state.cartReducer.err };
};

export default connect(
    mapStateToProps,
    { addCoupon }
)(InputCouponApplied)
