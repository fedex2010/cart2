import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";

import ComponentMillasAP from "./ComponentMillasAP";
import ComponentDiscountCoupon from "./ComponentDiscountCoupon";

function SuccessMessage(){
  let salesman = Cookie.get("epi.salesman");

  if(salesman){
    return <p className="alert alert-success fade in alert-dismissable salesman">Vendedor: {salesman}</p>
  }
  return null 
}


class Summary extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        sellerId:{},
        subtotalPrice:{},
        subtotalBasePrice: {},
        totalWarranties: {},
        specialDiscountAmount: {},
        discountCoupon:{},
        coupons : [],
        totalDiscounts: {},
        totalPrice: {}
    };
  }

  _formatPrice(value, decimals) {
    if(value == undefined){
        return 0;
    }
      /**
       * Number.prototype.format(n, x, s, c)
       *
       * @param integer n: length of decimal
       * @param integer x: length of whole part
       * @param mixed   s: sections delimiter
       * @param mixed   c: decimal delimiter
       */
      if(!decimals){
          decimals = 0;
      }

      var n = decimals,
          x = 3,
          s = ".",
          c = ",";

      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = value.toFixed(Math.max(0, ~~n));

    
      num = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
      return num.replace(",00", "")
  }


  render() {
    let couponClass = "highlight-benefit displaynone";
    let products="";
    let empresarias = (Cookie.get("empresarias")==='true'?true:false);
      if(typeof this.props.coupons !== "undefined"){
      couponClass =  (this.props.coupons.length >=1)? 'highlight-benefit': 'highlight-benefit displaynone';
    }
    if(this.props.products !== undefined){
        products = this.props.products;
    }

    let classLoading = this.props.operationStatus === "LOADING" ? "summary card--is-loading" : "summary"

    let subtotal = (this.props.subtotalBasePrice && this.props.subtotalPrice) ? this.props.subtotalBasePrice - this.props.subtotalPrice:0;

    let priceRound = this._formatPrice(this.props.subtotalPrice)
    let specialDiscountAmountRound = this._formatPrice(this.props.specialDiscountAmount);
    let totalWarrantiesRound = this._formatPrice(this.props.totalWarranties);
    let totalDiscountsRound = this._formatPrice(this.props.totalDiscounts);
    let subtotalRound = this._formatPrice(subtotal);
    let totalRound = this._formatPrice(this.props.totalPrice);

    return (
        <div className={classLoading}>
          {/* resumen de compra */}
          <div className="purchase-summary">
            {/*add class - card--is-loading - en  <div className="card cart-summary card--is-loading"> para el loading*/}
            <div className="card cart-summary">
              {/*  cart-seller <p className="cart-seller">Vendedor: 12345566</p> */}
              <div className="cart-summary-header">
                <span className="cart-summary-title">Resumen de compra</span>
              </div>

              <SuccessMessage />

              <ul className="summary-detail">
                <li id="subtotal">
                  <label>Subtotal</label>
                  <span className="summary-detail-value">${this.props.subtotalPrice > 0 ? priceRound : '0'}</span>
                </li>


               
                <li className={`${empresarias ? '' : 'displaynone'}`} id="empresarias">
                  <label>IVA</label>
                  <span className="summary-detail-value">${subtotalRound}</span>
                </li>
               

                <li className={this.props.totalWarranties > 0 ? '' : 'displaynone'} id="warranty">
                  <label>Garantías</label>
                  <span className="summary-detail-value">${this.props.totalWarranties > 0 ? totalWarrantiesRound : '0'}</span>
                </li>
                <li className={couponClass} id="coupon">
                  <label>Descuento por cupón</label>
                  <span className="summary-detail-value">- ${this.props.totalDiscounts > 0 ? totalDiscountsRound : '0'}</span>
                </li>
                <li className={this.props.specialDiscountAmount > 0 ? 'benefits' : 'benefits displaynone'} id="special-discount-line">
                  <label>Descuento especial</label>
                  <span className="summary-detail-value">- ${specialDiscountAmountRound}</span>
                </li>
                <li className="summary-total" id="total">
                  <label>Total</label>
                  <span className="summary-detail-value">${this.props.totalPrice > 0 ? totalRound : '0'}</span>
                </li>
              </ul>

              <div  className={`${empresarias ? 'cart-additionals displaynone' : 'cart-additionals'}`}>
                <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>     
                <ComponentDiscountCoupon discountCoupon={this.props.specialDiscountAmount} coupon={this.props.coupons}/>
                <ComponentMillasAP products={products} addMillasAP={this.props.addMillasAP}/>
              </div>
             


            </div>
            <div className="cart-actions">
              <button className="button--link">
                COMPRAR MÁS PRODUCTOS
              </button>
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
const mapStateToProps = state => {
    return { operationStatus: state.cartReducer.operationStatus };
};

export default connect(mapStateToProps,{})(Summary)
