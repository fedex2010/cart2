import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";
import Cookie from "js-cookie";
import { deleteCoupon } from "../../actions/CartAction";

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
    handleOptionChange = changeEvent => {
        this.setState({ selectedOption: changeEvent.target.value });
    };

    _showDelete(coupon){
        this.state.displaynoneShowCoupon = "";
      console.log("5c6434a7e4b09277d57822e0")
      console.log(coupon)
      console.log("5c6434a7e4b09277d57822e0")
      if(coupon && coupon[0] &&coupon[0].coupon_id){
          return (
              <div className="coupon-applied">
                  <span className="coupon-code">{coupon[0].coupon_id}</span>
                  <button className="link-to-button" onClick={this._deleteCoupon.bind(this, coupon[0])}>
                      Eliminar
                  </button>
              </div>
          );
      }
    }

    _deleteCoupon(coupon, e) {
        let cartId = Cookie.get("cartId");
        let couponId = coupon.coupon_id;
        this.props.deleteCoupon(couponId, cartId);
       
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

    _renderOption(displayNoneCoupon,coupon,hasPromotion){
        return (
            <ul className="cart-additional-item">
                {this._renderDiscountSpecial(hasPromotion)}
                <li>
                    {this._InputDiscount(hasPromotion)}
                    <div className={displayNoneCoupon}>
                        <InputCouponApplied />
                    </div>
                    {this._showDelete(coupon)}
                </li>
            </ul>
        );
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
        return (
            <div>
                {this._renderOption(displayNoneCoupon,this.props.coupon,hasPromotion)}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { item: state.cartReducer.item };
};

export default connect(
    mapStateToProps,
    { deleteCoupon }
)(ComponentDiscountCoupon);


/*
*
* if (this.props.discountCoupon > 0 || this.props.coupon > 0) {
            if (typeof this.props.coupon != "undefined" && typeof this.props.coupon[0] != "undefined")
                coupon = this.props.coupon[0];
            return (
                <ul className="cart-additional-item">
                    <li>
                        <label>
                            <input type="radio" id="add-coupon" name="discount-coupon"  value="discount-coupon1" checked={this.state.selectedOption === "discount-coupon1"} onChange={this.handleOptionChange}              />{" "}
                            Descuento especial
                        </label>
                    </li>
                    <li>
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
                        <div className={displayNoneCoupon}>
                            <InputCouponApplied />
                        </div>
                        {this._showDelete(coupon)}
                    </li>
                </ul>
            );
        } else {
            let coupon = (this.props.coupon && this.props.coupon[0])? this.props.coupon[0] : {};
            return (
                <div className="cart-additional-item">
                    <div className={coupon.status == "VALID" ? 'displaynone' : '' }>
                        <label>
                            <input type="checkbox" id="add-coupon"  value="checkboxDiscount" onChange={this.handleCheck}  defaultChecked={this.state.checkedCoupon} />{" "}
                            Tengo cupón de descuento
                        </label>
                        <div className={displaynoneCheckboxDiscount}>
                            <InputCouponApplied />
                        </div>
                    </div>
                    {this._showDelete(coupon)}
                </div>
            );
        }
* */
