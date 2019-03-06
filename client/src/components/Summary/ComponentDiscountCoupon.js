import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";
import Cookie from "js-cookie";
import { deleteCoupon, addCoupon ,justReload} from "../../actions/CartAction";

function CheckDiscount(props){
    return(
        <li>
            <label>
                <input  type="checkbox"  
                        value="discount-coupon2" 
                        checked={ props.isChecked } 
                        onChange={ props.handleOptionChange }
                />
                
                Tengo cupón de descuento
            </label>
        </li>
    )
}

function RadiosDiscount(props){
    return (
        <li>
            <label>
                <input type="radio" name="discount-coupon"  value="discount-coupon1" 
                    onChange={ props.handleOptionChange }
                    checked={ props.isSpecialChecked } 
                 />
                Descuento especial
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    name="discount-coupon"
                    value="discount-coupon2"
                    onChange={ props.handleOptionChange }
                    checked={ props.isCouponChecked }
                />
                Tengo cupón de descuento
            </label>
        </li>
    )
}
class ComponentDiscountCoupon extends Component {

    /*input radio*/
    constructor() {
        super();
        this.state = {
            selectedOption: "discount-coupon1",
            showInput: false,
            flow: ""
        };        

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    
    componentWillUnmount(){
        sessionStorage.removeItem("couponDeleted")
    }

    handleCheck(){
        this.setState({ showInput: !this.state.showInput ,flow: ""});
    };

    handleOptionChange(changeEvent){
        let showInput = ( changeEvent.target.value == "discount-coupon2" && !this._hasCouponApplied() )?true:false

        this.setState({  selectedOption: changeEvent.target.value , 
                         showInput: showInput ,
                         flow: ""
                        });

        console.log( this.state )
        console.log("changeEvent.target.value")
        console.log(changeEvent.target.value)
        console.log("changeEvent.target.value")
        
        if( this._hasCouponApplied( ) ){

            sessionStorage.setItem("couponDeleted",this._getCouponApplied())
            this._deleteCoupon( this._getCouponApplied() );

        }else if( sessionStorage.getItem("couponDeleted") != null ){

            this._addCoupon()

        }else if( changeEvent.target.value == "discount-coupon1" )  { //when click on "Descuento especial"       
            let cartId = Cookie.get("cartId");

            this.props.justReload(cartId)
        }else{

        }        
    }

    _addCoupon(){
        let cartId = Cookie.get("cartId");

        this.props.addCoupon(sessionStorage.getItem("couponDeleted"),cartId);
    }
    
    _getCouponApplied(){
        try{
            return this.props.cart.coupons[0].coupon_id
        }catch(err){
            console.log("-----------------")
            console.log(err)
            console.log("-----------------")
            return ""
        }
    }

    _showDelete(){
      if( this._hasCouponApplied( ) ){

          return (
              <div className="coupon-applied">       

                  <span className="coupon-code">{ this._getCouponApplied() }</span>
                  <button className="link-to-button" onClick={this._removeAndDeleteCoupon.bind(this, this._getCouponApplied() )}>
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

    _deleteCoupon( coupon_id ) {
        let cartId = Cookie.get("cartId");
        this.setState({ flow: "deleting" })

        this.props.deleteCoupon(coupon_id, cartId);
    }

    _isPromotion(){
        let {cart} = this.props

        let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
        let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
        let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status === 'VALID' && p.promotion.total_discount > 0;}).length > 0;
    
        return (hasPriceMatchingDiscount || hasPolcom || hasCrosseling);
    }

    _hasCouponApplied( ){
        let { cart } = this.props

        try{
            return ( cart.coupons && cart.coupons[0] && cart.coupons[0].coupon_id ) != undefined
        }catch(err){
            console.log("----------------")
            console.log(err)
            console.log("----------------")
            return false
        }
    }

    _showInput(){
        console.log("_showInput")
        console.log( this.state.selectedOption + "  -  " + this._hasCouponApplied() + "  -  " + this.state.flow )
        
        let display = "displaynone"
        if( ( this.state.showInput && !this._hasCouponApplied() )  ){
            display = "";
        }

        return display
    }

    render() {        

        let discountComponent
        if( this._isPromotion() ){            
            discountComponent = <RadiosDiscount handleOptionChange={this.handleOptionChange} 
                                                isSpecialChecked={ this.state.selectedOption === "discount-coupon1" }
                                                isCouponChecked={ this.state.selectedOption === "discount-coupon2" }/>
        }else{
            discountComponent = <CheckDiscount  handleOptionChange={this.handleCheck} 
                                                checked={ this._hasCouponApplied() } />
        }

        let aCupon = sessionStorage.getItem("couponDeleted")
        let inputContent = ( aCupon != null )? aCupon : "";

        return (
            <div id="discountCoupon">
                <ul className="cart-additional-item">
                    {discountComponent}
                    <li>
                        <InputCouponApplied display={this._showInput()} cupon={inputContent}/>
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