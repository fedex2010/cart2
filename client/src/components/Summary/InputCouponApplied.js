import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import {addCoupon} from "../../actions/CartAction";

class InputCouponApplied extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: props.cupon,
            disabled: "disabled",
            wasError: false
        }
        this.inputRef = React.createRef();
    }

  _addCoupon(e){
      let cartId = Cookie.get("cartId");
      
      //reset error class
      this.setState({ wasError: false });      

      this.props.addCoupon(this.state.input,cartId);
  }
  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      let cartId = Cookie.get("cartId");

      //reset error class
      this.setState({ wasError: false });      

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

  _thereWasAnError(){
    return this.state.wasError
  }

  _showError(){
    let classError = this._thereWasAnError() ? "error-msj" : "error-msj hide";
    return(<p className={classError} id="alert-coupon-fail">Código de cupón inválido.</p>);
  }
 
  componentWillReceiveProps(nextProps){
    let newState = {}
    if( nextProps.cupon !== "" ){
      newState.input = nextProps.cupon
      this.setState({ input: nextProps.cupon });      
    }

    if (nextProps.err.cause && nextProps.err.cause.code && ( nextProps.err.cause.code === 400 || nextProps.err.cause.code === 405)){
      this.setState({ wasError: true });      
    }

    if( nextProps.forceCleanInput ){
      this.setState({ input: "" });      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.inputRef.current.focus();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div className={ `InputCouponApplied  ${this.props.display}` }>

        <div className="coupon-apply-form">
            <input ref={this.inputRef} id="InputCouponApplied"  value={this.state.input}   
            onKeyPress={this._handleKeyPress.bind(this)} 
            className={`${ this._thereWasAnError() ? 'form-control form-control--sm form-control-error' : 'form-control form-control--sm'}`} type="text" placeholder="Respetá mayúsculas y minúsculas" onChange={this._handleInput.bind(this)}  autoComplete="off" />
            
            <button onClick={this._addCoupon.bind(this)} className="button--primary button--sm" id="apply-coupon" disabled={this.state.disabled}>Aplicar</button>
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
