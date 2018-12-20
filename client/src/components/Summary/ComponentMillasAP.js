import React, { Component } from "react";
import { connect } from "react-redux";

class ComponentMillasAP extends Component {

  constructor() {
     super();
     this.state = {
        checkedAP: false
     }
  }
  handleCheckAP = () => {
    this.setState({checkedAP: !this.state.checkedAP});
  }
 
  render() {
    let displaynoneCheckboxAP = 'displaynone';
    if(this.state.checkedAP){
        displaynoneCheckboxAP ='';
      }
    return (
      
        <div className="cart-additional-item">
            <label>
                <input
                type="checkbox"
                onChange={this.handleCheckAP}/> Sumá millas Aerolíneas Plus{" "}
            </label>
            <span className="gui-icon-question-mark-circle has-popover icon--xs icon--has-action">
                <span className="popover_bottomCenter">
                    <p>
                        Comprando ciertos productos en nuestra web podés sumar
                        millas en Aerolíneas Plus
                    </p>
                    <p>
                        <a data-target="#arplus-tyc">Ver bases y condiciones</a>
                    </p>
                </span>
            </span>
            <div className={displaynoneCheckboxAP}> 
                <div className="coupon-apply-form">
                    <input
                    className="form-control form-control--sm"
                    type="number"
                    placeholder="Ingresá tu número de socio"
                    min="999999"
                    max="99999999"
                    autoComplete="off"
                    />
                <button className="button--primary button--sm">
                Alicar
                </button>
            </div>
            <div className="coupon-applied">
                <span className="coupon-code">1234567</span>
                <a href="#">Eliminar</a>
                <p className="coupon-msj">
                Sumaste 35 millas Aerolíneas Plus.
                </p>
            </div>
        </div>
      </div>
  
    );
  }
}
export default ComponentMillasAP;
