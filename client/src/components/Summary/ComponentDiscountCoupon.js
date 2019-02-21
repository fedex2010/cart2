import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";
import Cookie from "js-cookie";
import { deleteCoupon, addCoupon ,justReload} from "../../actions/CartAction";

class ComponentDiscountCoupon extends Component {
    handleCheck = () => {
        this.setState({ checkedCoupon: !this.state.checkedCoupon });
    };

    /*input radio*/
    constructor() {
        super();
        this.state = {
            item: {},
            selectedOption: "discount-coupon1",
            checkedCoupon: false,
            displaynoneShowCoupon: "displaynone"
        };        
    }

    componentDidMount(){
        let selectedOption= (this.props.coupon && this.props.coupon[0] && this.props.coupon[0].coupon_id)?"discount-coupon2":"discount-coupon1";
        this.setState({ selectedOption: selectedOption });
    }

    handleOptionChange = changeEvent => {

        if((this.props.coupon && this.props.coupon[0] && this.props.coupon[0].coupon_id) ){

            sessionStorage.setItem("couponDeleted",this.props.coupon[0].coupon_id)
            this._deleteCoupon(this.props.coupon[0]);

        }else if( sessionStorage.getItem("couponDeleted") != null ){
                this._addCoupon()
        }else if( changeEvent.target.value == "discount-coupon1" )  { //when click on "Descuento especial"       
            let cartId = Cookie.get("cartId");

            this.props.justReload(cartId)
       }
        
       this.setState({ selectedOption: changeEvent.target.value });
    };

    _addCoupon(){
        let cartId = Cookie.get("cartId");

        this.props.addCoupon(sessionStorage.getItem("couponDeleted"),cartId);
    }
    
    _showDelete(coupon){
      if(coupon && coupon[0] && coupon[0].coupon_id){
          return (
              <div className="coupon-applied">       

                  <span className="coupon-code">{coupon[0].coupon_id}</span>
                  <button className="link-to-button" onClick={this._removeAndDeleteCoupon.bind(this, coupon[0])}>
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

    _renderDiscountSpecial(hasPromotion){
        if(hasPromotion){
            return(
                <li>
                    <label>
                        <input type="radio" id="add-coupon" name="discount-coupon"  value="discount-coupon1" checked={this.state.selectedOption === "discount-coupon1"} onChange={this.handleOptionChange} />{" "}
                        Descuento especial
                    </label>
                </li>
            )
        }
    }

    _InputDiscount(haspromotion){
       
       
        if(haspromotion){
            return (
                <label>
                    <input
                        type="radio"
                        name="discount-coupon"
                        value="discount-coupon2"
                        checked={this.state.selectedOption === "discount-coupon2"}
                        onChange={this.handleOptionChange}
                    />{" "}
                    Tengo cupón de descuento
                </label>
            )
        }else{
            return(
                <label>
                    <input type="checkbox" id="add-coupon"  value="discount-coupon2" onChange={this.handleCheck}  defaultChecked={this.state.checkedCoupon} />
                    Tengo cupón de descuento
                </label>
            )
        }
    }

    componentWillUnmount(){
        console.log("////////////////////////")
        console.log("//////////componentWillUnmount//////////////")
        console.log("////////////////////////")
    }

    render() {
        let displayNoneCoupon = "displaynone";
        let displaynoneCheckboxDiscount = "displaynone";
        let coupon = {}
        let hasPromotion = this.props.hasPromotion;
        if (this.state.selectedOption === "discount-coupon2" || this.state.checkedCoupon) {
            displayNoneCoupon = "";
        }
        if (this.state.checkedCoupon) {
            displaynoneCheckboxDiscount = "";
        }

        if((this.props.coupon && this.props.coupon[0] && this.props.coupon[0].coupon_id)){
            displayNoneCoupon = "displaynone";
        }


        let aCupon = sessionStorage.getItem("couponDeleted")
        let inputContent = ( aCupon != null )? aCupon : "";

        if( displayNoneCoupon == "" ){
            return (
                <div>
                    <ul className="cart-additional-item">
                        {this._renderDiscountSpecial(hasPromotion)}
                        <li>
                            {this._InputDiscount(hasPromotion)}
                            <InputCouponApplied cupon={inputContent}/>
                            {this._showDelete(this.props.coupon)}
                        </li>
                    </ul>
                </div>
            )    
        }else{
            return (
                <div>
                    <ul className="cart-additional-item">
                        {this._renderDiscountSpecial(hasPromotion)}
                        <li>
                            {this._InputDiscount(hasPromotion)}
                            {this._showDelete(this.props.coupon)}
                        </li>
                    </ul>
                </div>
            )    
        }

    }
}
const mapStateToProps = state => {
    return { item: state.cartReducer.item };
};

export default connect(
    mapStateToProps,
    { deleteCoupon ,addCoupon ,justReload}
)(ComponentDiscountCoupon);

