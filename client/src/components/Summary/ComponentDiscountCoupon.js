import React, { Component } from "react";
import { connect } from "react-redux";
import InputCouponApplied from "./InputCouponApplied";

class ComponentDiscountCoupon extends Component {

  
    handleCheck = () => {
        this.setState({checkedCoupon: !this.state.checkedCoupon});
      }
     
    /*input radio*/
    constructor() {
    super();
    this.state = {
        discountCoupon: true,
        selectedOption: 'discount-coupon1',
        checkedCoupon: false
    }
    }
    handleOptionChange = (changeEvent) => {
        this.setState({ selectedOption: changeEvent.target.value  })
    }

  render() {
    let displayNoneCoupon = 'displaynone';
    let displaynoneCheckboxDiscount = 'displaynone';
    
    if(this.state.selectedOption === 'discount-coupon2') {
       displayNoneCoupon = '';
    }
    
    if (this.state.checkedCoupon) {
      displaynoneCheckboxDiscount = '';
    }

    if (this.state.discountCoupon) {
        return (
            <ul className="cart-additional-item">
            <li>
              <label>
                <input
                type="radio"
                name="discount-coupon"
                value="discount-coupon1"
                checked={this.state.selectedOption === 'discount-coupon1'}
                onChange={this.handleOptionChange}/> Descuento
                especial
              </label>
            </li>
            <li>
              <label>
                <input
                type="radio"
                name="discount-coupon"
                value="discount-coupon2"
                checked={this.state.selectedOption === 'discount-coupon2'}
                onChange={this.handleOptionChange}/> Tengo cupón
                de descuento
              </label>
              <div className={displayNoneCoupon}>
                <InputCouponApplied/>
              </div>
            </li>
          </ul>
        );
      } else {
        return (
            <div className="cart-additional-item">
            <label>
              <input
              type="checkbox"
              value="checkboxDiscount"
              onChange={this.handleCheck}
              defaultChecked={this.state.checkedCoupon}
              /> Tengo cupón de descuento
            </label>
            <div className={displaynoneCheckboxDiscount}>
                <InputCouponApplied/>
            </div>
          </div>
        );
    }
  }
}
export default ComponentDiscountCoupon;
