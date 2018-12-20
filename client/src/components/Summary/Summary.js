import React, { Component } from "react";
import { connect } from "react-redux";

import ComponentMillasAP from "./ComponentMillasAP";

import ComponentDiscountCoupon from "./ComponentDiscountCoupon";

class Summary extends Component {
 
  render() {
 
    {/* add class -summary-absolute or summary-fixed - en el div contenedor summary */}
    return (
        <div className="summary">
          {/* resumen de compra */}
          <div className="purchase-summary">
            {/*add class - card--is-loading - en  <div className="card cart-summary card--is-loading"> para el loading*/}
            <div className="card cart-summary">
              {/*  cart-seller <p className="cart-seller">Vendedor: 12345566</p> */}
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
                <ComponentDiscountCoupon/>       
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
    );
  }
}
export default Summary;
