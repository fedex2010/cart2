import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import "../App.scss";

import Alert from "./Alert/Alert";
import Product from "./Product/Product";
import Summary from "./Summary/Summary";
import Carousel from "./Carousel/Carousel";
import { fetchCart , fetchNewCart } from "../actions/CartAction";
import { customURLSearchParams  } from "../utils/urlUtils";



class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    if( window.location.search ){
      const productId = customURLSearchParams( 'producto' );
      
      if(productId != null){
        this.state.productId = productId
        let cupon = customURLSearchParams( 'cupon' );
  
        this.state.cupon = (cupon == null)? "" : cupon 
       }  
    }

  }

  componentWillMount() {
    if(this.state.productId){
      this.props.fetchNewCart( this.state.productId, this.state.cupon );
      //document.body.dataset.cartid=Cookie.get("cartId");
    }else{
      let cartId = Cookie.get("cartId");
      this.props.fetchCart(cartId);    
    }
  }

    componentDidMount(){
        document.body.dataset.cartid = Cookie.get("cartId");
    }

  _showCarousel(){
      let empresarias = Cookie.get("empresarias");
      if(!empresarias !== "true"){
          return <Carousel data={this.props.cart.products} />
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

        return dataLayer;
    };

  _setDataLayer(cart) {
    let dataLayer = this._generateDataLayerForGTM(cart, null)
    
    window.dataLayer.push(dataLayer[0],dataLayer[1]);
  }


  render() {
    document.body.dataset.cartid = this.props.cart.cart_id;
    if (this.props.cart && this.props.cart.products) {
      this._setDataLayer(this.props.cart);
    }

    let {showGeneralLoading} = this.props

    if(!showGeneralLoading){
      document.body.classList.remove('full-page--is-loading');           
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
                  cart={this.props.cart}
                />
              </div>
              <div className="summary-gbChk col-md-4" data-role="resumenCompra">
                  <Summary />
              </div>
            </div>

            <br/>
            
            <div className="carousel row">
              <div className="col-md-12">
                  {this._showCarousel()}
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
    xBrand: state.cartReducer.xBrand ,
    showGeneralLoading: state.cartReducer.showGeneralLoading };
};

export default connect(
  mapStateToProps,
  { fetchCart ,fetchNewCart}
)(Cart);
