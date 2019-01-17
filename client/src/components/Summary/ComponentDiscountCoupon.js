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
            checkedCoupon: false
        };
    }
    handleOptionChange = changeEvent => {
        this.setState({ selectedOption: changeEvent.target.value });
    };

    _showDelete(coupon){
      console.log("coupon")
      console.log(coupon)
      console.log("coupon")
      if(coupon.coupon_id){
          return (
              <div className="coupon-applied">
                  <span className="coupon-code">{coupon.coupon_id}</span>
                  <button className="link-to-button" onClick={this._deleteCoupon.bind(this, coupon)}>
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

    render() {
        let displayNoneCoupon = "displaynone";
        let displaynoneCheckboxDiscount = "displaynone";
        let coupon = {};

        if (this.state.selectedOption === "discount-coupon2") {
            displayNoneCoupon = "";
        }

        if (this.state.checkedCoupon) {
            displaynoneCheckboxDiscount = "";
        }
        if (this.props.discountCoupon > 0 || this.props.coupon > 0) {
            if (typeof this.props.coupon != "undefined" && typeof this.props.coupon[0] != "undefined")
                coupon = this.props.coupon[0];
            return (
                <ul className="cart-additional-item">
                    <li>
                        <label>
                            <input type="radio"  name="discount-coupon"  value="discount-coupon1" checked={this.state.selectedOption === "discount-coupon1"} onChange={this.handleOptionChange}              />{" "}
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
                    <label>
                        <input type="checkbox" checked="checked" value="checkboxDiscount" onChange={this.handleCheck}  defaultChecked={this.state.checkedCoupon} />{" "}
                        Tengo cupón de descuento
                    </label>
                    <div className={displaynoneCheckboxDiscount}>
                        <InputCouponApplied />
                    </div>
                    {this._showDelete(coupon)}
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    return { item: state.cartReducer.item };
};

export default connect(
    mapStateToProps,
    { deleteCoupon }
)(ComponentDiscountCoupon);
