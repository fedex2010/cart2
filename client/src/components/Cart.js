import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import "../App.scss";

import Alert from "./Alert/Alert";
import Product from "./Product/Product";
import Summary from "./Summary/Summary";
import Carousel from "./Carousel/Carousel";
import { fetchCart , fetchNewCartByProduct } from "../actions/CartAction";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const params = new URLSearchParams( window.location.search );
    const productId = params.get('producto');

    if(productId != null){
      this.state.productId = productId
      let cupon = params.get('cupon')

      this.state.cupon = (cupon == null)? "" : cupon 
     }
  }

  componentWillMount() {
    if(this.state.productId){
      this.props.fetchNewCartByProduct( this.state.productId, this.state.cupon );    
    }else{
      let cartId = Cookie.get("cartId");
      this.props.fetchCart(cartId);    
    }
  }
  

 

  _generateDataLayerForGTM(cart, userType=null){
        let dataLayer = [];
        let cartProductsIds = [];
        let cartTotal = cart.total_price || null;

        if (cartTotal !== null) {
            cartTotal = cartTotal.toString();
        }

        if(cart.products.length>=1){
            cart.products.forEach(function (product) {
                cartProductsIds.push(product.product_id);
            });
        }else{
            cartProductsIds.push([]);
        }

        let main = {
            event: "none",
            pagetype: "cart",
            prodID: cartProductsIds.toString(),
            totalvalue: cartTotal
        };

        let ecommerce = {
            event: "checkout",
            virtualurl: "/mi-carrito.html",
            typeUser: userType,
            ecommerce: {
                checkout:{
                    actionField: {
                        action: 'checkout',
                        step: 1
                    },
                    products: cart.products.map((product) => {
                        let details = product.details || {}
                        return {
                            brand: details.brand,
                            category: details.category||details.category_id,
                            id: product.product_id,
                            name: details.description,
                            price: product.price,
                            quantity: product.quantity,
                            variant:""
                        }
                    })
                }
            }
        }

        dataLayer.push(main);
        dataLayer.push(ecommerce);

        return JSON.stringify(dataLayer);
    };

  _setDataLayer(cart) {
    window.dataLayer.push(this._generateDataLayerForGTM(cart, null));
  }


  render() {
    if (this.props.cart && this.props.cart.products) {
      this._setDataLayer(this.props.cart);
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
                  <Summary cart={this.props.cart}/>
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

const mapStateToProps = state => {
  return { 
    cart: state.cartReducer.cart, 
    err : state.cartReducer.err, 
    xBrand: state.cartReducer.xBrand };
};

export default connect(
  mapStateToProps,
  { fetchCart ,fetchNewCartByProduct}
)(Cart);
