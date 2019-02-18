import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";
import Cookie from "js-cookie";
import { deleteCoupon, addCoupon } from "../../actions/CartAction";

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
            couponDelete:"",
            displaynoneShowCoupon: "displaynone"
        };
    }

    _addCoupon(e){
        let cartId = Cookie.get("cartId");
        this.props.addCoupon(this.state.couponDelete,cartId);
    }

    componentDidMount(){
        console.log(this.props);
        let selectedOption= (this.props.coupon && this.props.coupon[0] && this.props.coupon[0].coupon_id)?"discount-coupon2":"discount-coupon1";
        this.setState({ selectedOption: selectedOption });
    }

    handleOptionChange = changeEvent => {
        this.setState({ selectedOption: changeEvent.target.value });
        if((this.props.coupon && this.props.coupon[0] && this.props.coupon[0].coupon_id)){
            this.setState({ couponDelete: this.props.coupon[0].coupon_id });
            this._deleteCoupon(this.props.coupon[0],"");
        }else{
            if(this.state.couponDelete){
                this._addCoupon()
            }
        }
    };

    _showDelete(coupon){
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

        if((this.props.coupon && this.props.coupon[0] && this.props.coupon[0].coupon_id)){
            displayNoneCoupon = "displaynone";
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
    { deleteCoupon ,addCoupon }
)(ComponentDiscountCoupon);

