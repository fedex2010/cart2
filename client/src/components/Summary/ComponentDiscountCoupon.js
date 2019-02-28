import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";
import Cookie from "js-cookie";
import { deleteCoupon, addCoupon ,justReload} from "../../actions/CartAction";

class ComponentDiscountCoupon extends Component {

    /*input radio*/
    constructor() {
        super();
        this.state = {
            item: {},
            selectedOption: "discount-coupon1",
            displaynoneShowCoupon: "displaynone"
        };        

        this.handleOptionChange = this.handleOptionChange.bind(this);

    }

    handleOptionChange(changeEvent){

        console.log("changeEvent.target.value")
        console.log(changeEvent.target.value)
        console.log("changeEvent.target.value")
        
        if( this._hasCouponApplied( ) ){

            sessionStorage.setItem("couponDeleted",this.props.cart.coupon[0].coupon_id)
            this._deleteCoupon(this.props.cart.coupon[0]);

        }else if( sessionStorage.getItem("couponDeleted") != null ){

            this._addCoupon()

        }else if( changeEvent.target.value == "discount-coupon1" )  { //when click on "Descuento especial"       
            let cartId = Cookie.get("cartId");

            this.props.justReload(cartId)
        }
        
       this.setState({ selectedOption: changeEvent.target.value });
    }

    _addCoupon(){
        let cartId = Cookie.get("cartId");

        this.props.addCoupon(sessionStorage.getItem("couponDeleted"),cartId);
    }
    
    _showDelete(){
      if( this._hasCouponApplied( ) ){

          return (
              <div className="coupon-applied">       

                  <span className="coupon-code">{this.props.cart.coupons[0].coupon_id}</span>
                  <button className="link-to-button" onClick={this._removeAndDeleteCoupon.bind(this, this.props.cart.coupons[0].coupon_id)}>
                      Eliminar
                  </button>
              </div>
          );

      }
    }

    _removeAndDeleteCoupon(cupon){
        sessionStorage.removeItem("couponDeleted")

        this._deleteCoupon(cupon)
    }

    _deleteCoupon({coupon_id}) {
        let cartId = Cookie.get("cartId");
        this.props.deleteCoupon(coupon_id, cartId);
    }

    _renderRadios( ){

        if( this._isPromotion(this.props.cart) ){

            console.log("this.state.selectedOption")
            console.log( this.state.selectedOption )
            console.log( this._hasCouponApplied( ) )
            console.log( "-------------------------------------------" )
            console.log( this.state.selectedOption === "discount-coupon1"   )
            console.log("this.state.selectedOption")
            
            return (
                <li>
                    <label>
                        <input type="radio" name="discount-coupon"  value="discount-coupon1" 
                            onChange={this.handleOptionChange}
                            checked={this.state.selectedOption === "discount-coupon1" || !this._hasCouponApplied( ) } 
                         />
                        
                        Descuento especial
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="discount-coupon"
                            value="discount-coupon2"
                            onChange={this.handleOptionChange}
                            checked={ this._hasCouponApplied( ) }
                        />
                        Tengo cupón de descuento
                    </label>
                </li>
            )
        }else{
            return(
                <label>
                    <input type="checkbox"  value="discount-coupon2" />
                    Tengo cupón de descuento
                </label>
            )
        }

    }


    _isPromotion(cart){
        let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
        let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
        let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status === 'VALID' && p.promotion.total_discount > 0;}).length > 0;
    
        return (hasPriceMatchingDiscount || hasPolcom || hasCrosseling);
    }

    _hasCouponApplied( ){
        let { cart } = this.props

        return ( cart.coupons && cart.coupons[0] && cart.coupons[0].coupon_id ) != undefined 
    }

    render() {
        let displayNoneCoupon = "displaynone";
        
        if (this.state.selectedOption === "discount-coupon2") {
            displayNoneCoupon = "";
        }

        if ( this._hasCouponApplied( ) ){
            displayNoneCoupon = "displaynone";
        }

        console.log("33333333333333333333")
        console.log( displayNoneCoupon )
        console.log("33333333333333333333")

        let aCupon = sessionStorage.getItem("couponDeleted")
        let inputContent = ( aCupon != null )? aCupon : "";

        return (
            <div>
                <ul className="cart-additional-item">
                    {this._renderRadios( )}
                    <li>
                        <InputCouponApplied display={displayNoneCoupon} cupon={inputContent}/>
                        {this._showDelete( )}
                    </li>
                </ul>
            </div>
        )    
    }
}
const mapStateToProps = state => {
    return { };
};

//VER PORQUE NO ESTABA SIENDO USADO

export default connect(
    mapStateToProps,
    { deleteCoupon ,addCoupon ,justReload}
)(ComponentDiscountCoupon);