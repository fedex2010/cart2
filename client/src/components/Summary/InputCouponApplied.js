import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";

class InputCouponApplied extends Component {

  _addCoupon(e){
      let cartId = Cookie.get("cartId");
      let couponId = e.target.value;
      console.log(couponId);
      //this.props._addCoupon(cartId,"CHKTEST");
  }
 
  render() {
    
    return (
      <div className="InputCouponApplied">
      
        <div className="coupon-apply-form">
            {/*add class - form-control-error - to error input*/} 
            <input className="form-control form-control--sm" type="text" placeholder="Respetá mayúsculas y minúsculas"  autoComplete="off" />
            {/*add class - button__is-loading - to loading button */}
            <button onClick={this._addCoupon.bind(this)} className="button--primary button--sm">Aplicar</button>
            {/*remove class - hide - to error message*/} 
            <p className="error-msj hide">Código de cupón inválido.</p>
        </div>
        <div className="coupon-applied displaynone">
            <span className="coupon-code">CHKTEST</span>
            <a href="#">Eliminar</a>
        </div>
        
      </div>
    );
  }
}
export default InputCouponApplied;
