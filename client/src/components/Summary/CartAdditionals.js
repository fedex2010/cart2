import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";

import ComponentMillasAP from "./ComponentMillasAP";
import ComponentDiscountCoupon from "./ComponentDiscountCoupon";

class CartAdditionals extends Component {
    constructor(props) {
        super(props);
    }

    isPromotion(cart){
        let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
        let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
        let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status === 'VALID' && p.promotion.total_discount > 0;}).length > 0;
    
        return (hasPriceMatchingDiscount || hasPolcom || hasCrosseling);
    }
    
    render(){
        console.log("*******************")
        console.log(this.props.cart)
        console.log("*******************")
        
        if( Object.keys(this.props.cart).length == 0 ){
            return null
        }

        let empresarias = (Cookie.get("empresarias")==='true'?true:false);

        return (
            <div className={`${(empresarias || this.props.cart.products.length === 0) ? 'cart-additionals displaynone' : 'cart-additionals'}`}>
                <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>
                <ComponentDiscountCoupon discountCoupon={this.props.cart.specialDiscountAmount} coupon={this.props.cart.coupons} hasPromotion={ this.isPromotion(this.props.cart) }/>
                <ComponentMillasAP products={this.props.cart.products} addMillasAP={this.props.cart.addMillasAP}/>
            </div>
        )
    }    
}

export default CartAdditionals