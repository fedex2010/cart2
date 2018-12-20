import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";
import ComponentMillasAP from "./ComponentMillasAP";

class Summary extends Component {
 
  handleCheck = () => {
    this.setState({checkedCoupon: !this.state.checkedCoupon});
  }
 
   /*input radio*/
   constructor() {
    super();
    this.state = {
      selectedOption: 'discount-coupon1',
      checkedCoupon: false
    }
  }
   handleOptionChange = (changeEvent) => {
    this.setState({ selectedOption: changeEvent.target.value  })
   }

  render() {
    let displayNoneCoupon = 'displaynone';
    let displaynoneCheckboxDiscount = 'displaynone';
    
    if(this.state.selectedOption === 'discount-coupon2') {
       displayNoneCoupon = '';
    }
    
    if (this.state.checkedCoupon) {
      displaynoneCheckboxDiscount = '';
    }
    
    return (
      <div className="summary">
        <div className="summary-absolute">
          {/* resumen de compra */}
          <div className="purchase-summary">
            <div className="card cart-summary">
              {/*  ******** NOTA ********
                           Para que el contenedor tenga el estado" loading" 
                           se agrega la clase card--is-loading
                           <div className="card cart-summary card--is-loading">
                           ********* ***** ********
                        */}

              <p className="cart-seller">Vendedor: 12345566</p>

              <div className="cart-summary-header">
                <span className="cart-summary-title">Resumen de compra</span>
              </div>

              <ul className="summary-detail">
                <li>
                  <label>Subtotal</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li>
                  <label>IVA</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li>
                  <label>Garantías</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li className="highlight-benefit">
                  <label>Descuento por cupón</label>
                  <span className="summary-detail-value">- $500</span>
                </li>
                <li className="benefits">
                  <label>Descuento especial</label>
                  <span className="summary-detail-value">- $500</span>
                </li>
                <li className="summary-total">
                  <label>Total</label>
                  <span className="summary-detail-value">$20.696,10</span>
                </li>
              </ul>

              {/* cupones y descuentos */}
              <div className="cart-additionals">
                <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>

                <ul className="cart-additional-item">
                  <li>
                    <label>
                      <input
                      type="radio"
                      name="discount-coupon"
                      value="discount-coupon1"
                      checked={this.state.selectedOption === 'discount-coupon1'}
                      onChange={this.handleOptionChange}/> Descuento
                      especial
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                      type="radio"
                      name="discount-coupon"
                      value="discount-coupon2"
                      checked={this.state.selectedOption === 'discount-coupon2'}
                      onChange={this.handleOptionChange}/> Tengo cupón
                      de descuento
                    </label>
                    <div className={displayNoneCoupon}>
                      <InputCouponApplied/>
                    </div>
                  </li>
                </ul>

                <div className="cart-additional-item">
                  <label>
                    <input
                    type="checkbox"
                    value="checkboxDiscount"
                    onChange={this.handleCheck}
                    defaultChecked={this.state.checkedCoupon}
                    /> Tengo cupón de descuento
                  </label>
                  <div className={displaynoneCheckboxDiscount}>
                      <InputCouponApplied/>
                  </div>
                </div>
                
                <ComponentMillasAP/>
              </div>
            </div>
            <div className="cart-actions">
              <a className="button--link" href="#">
                COMPRAR MÁS PRODUCTOS
              </a>
              <button type="button" className="button--primary">
                Continuar
              </button>
            </div>
          </div>
          {/* FIN resumen de compra */}
        </div>
      </div>
    );
  }
}
export default Summary;
