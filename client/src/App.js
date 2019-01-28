import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import "./App.scss";

import Alert from "./components/Alert/Alert";
import Product from "./components/Product/Product";
import Summary from "./components/Summary/Summary";
import Carousel from "./components/Carousel/Carousel";
import { fetchCart } from "./actions/CartAction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let cartId = Cookie.get("cartId");
    this.props.fetchCart(cartId);
  }

  _productCant(products){
      let count = products.length;
      console.log("---------"+count)
      let classSummary = (count >=3 )?"purchase-summary--fixed":"";
      console.log("classSummary"+classSummary)
      return classSummary;
  }

  render() {
    let specialDiscountAmount = 0;
    let classSummary = "";
    if (this.props.cart !== undefined) {
      if (
        this.props.cart.discount_details !== undefined &&
        this.props.cart.discount_details.length >= 1
      ) {
        if (this.props.cart.discount_details[0].source === "CROSSELLING") {
          specialDiscountAmount += this.props.cart.discount_details[0].amount;
        }
        if (
          this.props.cart.discount_details[0].source === "POLCOM" ||
          this.props.cart.discount_details[0].source === "PRICE_MATCHING"
        ) {
          specialDiscountAmount += this.props.cart.discount_details[0].amount;
        }
      }
      console.log(this.props.cart);
      if(this.props.cart.products){
          classSummary = this._productCant(this.props.cart.products);
          console.log("classSummary"+classSummary)
      }
      return (
        <div className="App">
          <div className="main-wrapper wrapper">
            <section>
              <h1 className="cart-title">Mi Carrito</h1>
              <div className="row">
                  <Alert cart={this.props.cart}/>
              </div>
              <div className="product-summary-gbChk row">
                <div className="product-gbChk col-md-8 ">
                  <Product
                    product={this.props.cart.products}
                    percentage={this.props.cart.percentage}
                  />
                </div>
                <div className="summary-gbChk col-md-4" data-role="resumenCompra">
                  <div className={classSummary}>
                    <Summary
                      products={this.props.cart.products}
                      sellerId={this.props.cart.seller_id}
                      subtotalPrice={this.props.cart.subtotal_price}
                      subtotalBasePrice={this.props.cart.subtotal_base_price}
                      totalWarranties={this.props.cart.total_warranties}
                      specialDiscountAmount={specialDiscountAmount}
                      coupons={this.props.cart.coupons}
                      addMillasAP={this.props.cart.loyalties}
                      totalDiscounts={this.props.cart.total_discounts}
                      totalPrice={this.props.cart.total_price}
                    />
                  </div>
                </div>
              </div>
              
              
              <br/>
              
              <div className="carousel row">
                <div className="col-md-12">
                  <Carousel data={this.props.cart.products} />
                </div>
              </div>

            </section>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cart: state.cartReducer.cart, err : state.cartReducer.err, xBrand: state.cartReducer.xBrand };
};

export default connect(
  mapStateToProps,
  { fetchCart }
)(App);
