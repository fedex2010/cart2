import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import "./App.scss";

import Alert from "./components/Alert/Alert";
import Product from "./components/Product/Product";
import Summary from "./components/Summary/Summary";
//import Carousel from "./components/Carousel/Carousel";
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



  render() {
    let specialDiscountAmount = 0;

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
      return (
        <div className="App">
          <div className="main-wrapper wrapper">
            <section>
              <h1 className="cart-title">Mi Carrito</h1>
              <div className="row">
                  <Alert cart={this.props.cart}/>
              </div>
              <div className="product-summary-gbChk row">
                <div className="product-gbChk col-md-8">
                  <Product
                    product={this.props.cart.products}
                    percentage={this.props.cart.percentage}
                  />
                </div>
                <div className="summary-gbChk col-md-4">
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
  return { cart: state.cartReducer.cart };
};

export default connect(
  mapStateToProps,
  { fetchCart }
)(App);
