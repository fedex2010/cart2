import React, { Component } from "react";
import { connect } from "react-redux";

class InputCouponApplied extends Component {
 
  render() {
    
    return (
      <div className="InputCouponApplied">
      
        <div className="coupon-apply-form">
            {/*add class - form-control-error - to error input*/} 
            <input
            className="form-control form-control--sm"
            type="text"
            placeholder="Respetá mayúsculas y minúsculas"
            autoComplete="off"
            />
            {/*add class - button__is-loading - to loading button */}
            <button className="button--primary button--sm">
            Alicar
            </button>
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
