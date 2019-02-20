import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import {addCoupon} from "../../actions/CartAction";

class InputCouponApplied extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: props.cupon,
            disabled: "disabled"
        }
        this.inputRef = React.createRef();
    }

  _addCoupon(e){
      let cartId = Cookie.get("cartId");
      this.props.addCoupon(this.state.input,cartId);
  }
  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      let cartId = Cookie.get("cartId");
      this.props.addCoupon(this.state.input,cartId);
    }
  }

  _handleInput(e){
      if(e.target.value.length > 0){
        this.setState({ disabled: "" });
      }else {
        this.setState({ disabled: "disabled" });
      }

      let couponId = e.target.value;
      this.setState({ input: couponId });
     
  }

  _showError(){
    let classError = (this.props.err.cause && this.props.err.cause.code && this.props.err.cause.code === "400")? "error-msj" : "error-msj hide";
    return(<p className={classError} id="alert-coupon-fail">Código de cupón inválido.</p>);
  }
 
  componentWillReceiveProps(nextProps){
    this.setState({input: nextProps.cupon});
  }

  componentDidUpdate(prevProps, prevState) {
    this.inputRef.current.focus();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div className="InputCouponApplied">
        <div className="coupon-apply-form">
            <input ref={this.inputRef} id="InputCouponApplied"  value={this.state.input}   onKeyPress={this._handleKeyPress.bind(this)} className={`${this.props.err.cause && this.props.err.cause.code && this.props.err.cause.code === "400" ? 'form-control form-control--sm form-control-error' : 'form-control form-control--sm'}`} type="text" placeholder="Respetá mayúsculas y minúsculas" onChange={this._handleInput.bind(this)}  autoComplete="off" />
            <button onClick={this._addCoupon.bind(this)} className="button--primary button--sm" disabled={this.state.disabled}>Aplicar</button>
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
