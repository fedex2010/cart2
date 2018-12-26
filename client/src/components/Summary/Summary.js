import React, { Component } from "react";
import { connect } from "react-redux";

import ComponentMillasAP from "./ComponentMillasAP";
import ComponentDiscountCoupon from "./ComponentDiscountCoupon";

import StickySummary from "./StickySummary";


class Summary extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        sellerId:{},
        subtotalPrice:{},
        totalWarranties: {},
        specialDiscountAmount: {},
        discountCoupon:{},
        coupons : {},
        totalDiscounts: {},
        totalPrice: {}
    };
  }
  componentWillUpdate(){
    
  }
  render() {
    console.log("fdfdfd",this.props.coupons)
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
                  <span className="summary-detail-value">${this.props.subtotalPrice > 0 ? this.props.subtotalPrice : '0'}</span>
                </li>
                <li>
                  <label>IVA</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li className={this.props.totalWarranties > 0 ? '' : 'displaynone'}>
                  <label>Garantías</label>
                  <span className="summary-detail-value">${this.props.totalWarranties > 0 ? this.props.totalWarranties : '0'}</span>
                </li>
                <li className={this.props.coupons > 0 ? 'highlight-benefit' : 'highlight-benefit displaynone'}>
                  <label>Descuento por cupón</label>
                  <span className="summary-detail-value">- ${this.props.totalDiscounts > 0 ? this.props.totalDiscounts : '0'}</span>
                </li>
                <li className="benefits">
                  <label>Descuento especial</label>
                  <span className="summary-detail-value">- ${this.props.specialDiscountAmount}</span>
                </li>
                <li className="summary-total">
                  <label>Total</label>
                  <span className="summary-detail-value">${this.props.totalPrice > 0 ? this.props.totalPrice : '0'}</span>
                </li>
              </ul>

              {/* cupones y descuentos */}
              <div className="cart-additionals">
                <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>     
                <ComponentDiscountCoupon discountCoupon={this.props.specialDiscountAmount}/>       
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