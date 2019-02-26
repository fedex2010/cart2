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
        sellerId: props.cart.seller_id,
        subtotalPrice: props.cart.subtotal_price ,
        subtotalBasePrice: props.cart.subtotal_base_price,
        totalWarranties: props.cart.total_warranties,
        specialDiscountAmount: this._getSpecialDiscount( props.cart ),
        discountCoupon:{},
        coupons : [],
        addMillasAP:[],
        totalDiscounts: props.cart.total_discounts,
        totalPrice: props.cart.total_price,
        show:true,
        hasPromotion:false,
        cart:props.cart
    };

    if(this.props.cart.products){
        this.state.hasPromotion = this._isPromotion(this.props.cart);
    }
    
    if(this.props.cart.coupons){
        this.state.coupons = this.props.cart.coupons
    }
    if(this.props.cart.addMillasAP){
        this.state.addMillasAP = this.props.cart.addMillasAP
    }
  }

  componentDidMount () {
    this.timeoutId = setTimeout(function () {
            this.setState({show: true});
        }.bind(this), 2000);
    }

  componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

  _continue(e){
      window.location = "/compra/entrega";
  }

  _getSpecialDiscount(cart){
      let specialDiscountAmount = 0
    if (cart.discount_details !== undefined && cart.discount_details.length >= 1 ) {
        if (cart.discount_details[0].source === "CROSSELLING") {
            specialDiscountAmount += cart.discount_details[0].amount;
        }

        if (cart.discount_details[0].source === "POLCOM" || cart.discount_details[0].source === "PRICE_MATCHING") {
            specialDiscountAmount += cart.total_discounts || cart.discount_details[0].amount ;
        }
    }
    return specialDiscountAmount
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

  componentWillReceiveProps(nextProps){
    this.setState({input: nextProps.cupon});
  }

  _isThereProductWithOutStock(){
    let disabled = false

    if(this.props.products !== undefined){
        let { products } = this.props;

        try{
            for (let i = 0; i < products.length; i++) {
                if(!products[i].validations.saleable){
                    disabled = true
                    break
                }    
            }            
        }catch(err){
            console.error(err)
            disabled = false
        }

    }
    return disabled
  }


 
    _isPromotion(cart){
        let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
        let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
        let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status === 'VALID' && p.promotion.total_discount > 0;}).length > 0;

        return (hasPriceMatchingDiscount || hasPolcom || hasCrosseling);
    }

    _productCant(products){
        let count = products.length;
        let classSummary = (count >=3 )?"purchase-summary--fixed":"";
        return classSummary;
    }
    

  render() {
    

    let couponClass = couponClass =  (this.state.coupons.length >=1)? 'highlight-benefit': 'displaynone';
    let products="";
    let empresarias = (Cookie.get("empresarias")==='true'?true:false);
    
    let disabled = this._isThereProductWithOutStock()

    let classLoading = this.props.operationStatus === "LOADING" ? "summary card--is-loading" : "summary"

    let subtotal = (this.state.subtotalBasePrice && this.state.subtotalPrice) ? this.state.subtotalBasePrice - this.state.subtotalPrice:0;
    
    let priceRound = this._formatPrice(this.state.subtotalPrice)
    let specialDiscountAmountRound = this._formatPrice(this.state.specialDiscountAmount);
    let totalWarrantiesRound = this._formatPrice(this.state.totalWarranties);
    let totalDiscountsRound = this._formatPrice(this.state.totalDiscounts);
    let subtotalRound = this._formatPrice(subtotal);
    let totalRound = this._formatPrice(this.state.totalPrice);

    let classSummary = ""
    if(this.state.cart.products){
        classSummary = this._productCant(this.state.cart.products);
    }

    return (
        <div className={classSummary}>
            <div className={classLoading}>
                <div className="purchase-summary">
                    <div className="card cart-summary">
                        <div className="cart-summary-header">
                            <span className="cart-summary-title">Resumen de compra</span>
                        </div>
                        
                        <SuccessMessage />
                        
                        <ul className="summary-detail">
                            <li id="subtotal">
                                <label>Subtotal</label>
                                <span className="summary-detail-value">${this.state.subtotalPrice > 0 ? priceRound : '0'}</span>
                            </li>


                            <li className={`${empresarias ? '' : 'displaynone'}`} id="empresarias">
                                <label>IVA</label>
                                <span className="summary-detail-value">${subtotalRound}</span>
                            </li>
                            <li className={this.state.totalWarranties > 0 ? '' : 'displaynone'} id="warranty">
                                <label>Garantías</label>
                                <span className="summary-detail-value">${this.state.totalWarranties > 0 ? totalWarrantiesRound : '0'}</span>
                            </li>


                            <li className={!this.state.coupons ? "displaynone" : couponClass} id="coupon">
                                <label>Descuento por cupón</label>
                                <span className="summary-detail-value">- ${this.state.totalDiscounts > 0 ? totalDiscountsRound : '0'}</span>
                            </li>
                            <li className={this.state.specialDiscountAmount > 0 ? 'benefits' : 'benefits displaynone'} id="special-discount-line">
                                <label>Descuento especial</label>
                                <span className="summary-detail-value">- ${specialDiscountAmountRound}</span>
                            </li>
                            <li className="summary-total" id="total">
                                <label>Total</label>
                                <span className="summary-detail-value">${this.state.totalPrice > 0 ? totalRound : '0'}</span>
                            </li>
                        </ul>

                        <div  className={`${(empresarias || products.length === 0) ? 'cart-additionals displaynone' : 'cart-additionals'}`}>
                            <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>
                            <ComponentDiscountCoupon discountCoupon={this.state.specialDiscountAmount} coupon={this.state.coupons} hasPromotion={this.state.hasPromotion}/>
                            <ComponentMillasAP products={products} addMillasAP={this.state.addMillasAP}/>
                        </div>
                    </div>
                    <div className="cart-actions">
                        <button className="button--link">
                            COMPRAR MÁS PRODUCTOS
                        </button>
                        <button type="button" className="button--primary" disabled={disabled} onClick={this._continue.bind()}>
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
    return { operationStatus: state.cartReducer.operationStatus };
};

export default connect(mapStateToProps,{})(Summary)
