import React, { Component } from "react";
import ReactDOM from 'react-dom';

import Cookie from "js-cookie";

import ComponentMillasAP from "./ComponentMillasAP";
import ComponentDiscountCoupon from "./ComponentDiscountCoupon";

class CartAdditionals extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        if( Object.keys(this.props.cart).length == 0 ){
            //is used for ComponentDiscountCoupon
            sessionStorage.removeItem("couponDeleted")
            //ReactDOM.unmountComponentAtNode(document.getElementById('discountCoupon'));
            return null
        }

        let empresarias = (Cookie.get("empresarias")==='true'?true:false);

        return (
            <div className={`${(empresarias || this.props.cart.products.length === 0) ? 'cart-additionals displaynone' : 'cart-additionals'}`}>
                <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>
                <ComponentDiscountCoupon cart={this.props.cart}   />
                <ComponentMillasAP products={this.props.cart.products} addMillasAP={this.props.cart.addMillasAP}/>
            </div>
        )
    }    
}

export default CartAdditionals