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
                        checked={ props.checked } 
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
            <label className="labelRadio">
                <input type="radio" name="discount-coupon"  value="discount-coupon1" 
                    onChange={ props.handleOptionChange }
                    checked={ props.isSpecialChecked } 
                 />
                Descuento especial
            </label>
            <label  className="labelRadio">
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
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "discount-coupon1",
            showInput: false
        };        

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

        if( this._hasCouponApplied() ){
            this.setState({
                selectedOption: "discount-coupon2"
            });
        }
    }

    
    componentWillUnmount(){
        sessionStorage.removeItem("couponDeleted")
    }

    handleCheck(){
        this.setState({ 
            showInput: !this.state.showInput 
        });
    };

    handleOptionChange(changeEvent){
        let showInput = ( changeEvent.target.value === "discount-coupon2" && !this._hasCouponApplied() )?true:false

        this.setState({  selectedOption: changeEvent.target.value , 
                         showInput: showInput 
                        });
        
        if( this._hasCouponApplied( ) ){
            sessionStorage.setItem("couponDeleted",this._getCouponApplied())
            this._deleteCoupon( this._getCouponApplied() );

        }else if( sessionStorage.getItem("couponDeleted") != null ){

            this._addCoupon()

        }else if( changeEvent.target.value === "discount-coupon1" )  { //when click on "Descuento especial"
            let cartId = Cookie.get("cartId");

            this.props.justReload(cartId)
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
            return ""
        }
    }

    

    _removeAndDeleteCoupon(cupon){
        sessionStorage.removeItem("couponDeleted")
        this._deleteCoupon(cupon)
    }

    _deleteCoupon( coupon_id ) {
        let cartId = Cookie.get("cartId");

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
            console.log("return true");
            return ( cart.coupons && cart.coupons[0] && cart.coupons[0].coupon_id ) != undefined
        }catch(err){
            console.log("return false");
            return false
        }
    }

    _showInput(){        
        let display = "displaynone"
        if( ( this.state.showInput && !this._hasCouponApplied() )  ){
            display = "";
        }

        return display
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
      
    _getCouponComponent(){
        let discountComponent

        if( this._isPromotion() ){            
            discountComponent = <RadiosDiscount handleOptionChange={this.handleOptionChange} 
                                                isSpecialChecked={ this.state.selectedOption === "discount-coupon1" && !this._hasCouponApplied()}
                                                isCouponChecked={ this.state.selectedOption === "discount-coupon2" || this._hasCouponApplied()}/>
        }else{
            discountComponent = <CheckDiscount  handleOptionChange={this.handleCheck} 
                                                checked={ this.state.showInput || this._hasCouponApplied() } />
        }
        return discountComponent
    }

    render() {        
    
        let aCupon = sessionStorage.getItem("couponDeleted")
        let inputContent = ( aCupon != null )? aCupon : "";

        return (
            <div id="discountCoupon">
                <ul className="cart-additional-item">
                    {this._getCouponComponent()}
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