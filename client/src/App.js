import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import "./App.scss";

import Alert from "./components/Alert/Alert";
import Product from "./components/Product/Product";
import Summary from "./components/Summary/Summary";
import Carousel from "./components/Carousel/Carousel";
import {fetchCart} from "./actions/CartAction";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        let cartId = Cookie.get("cartId")
        this.props.fetchCart(cartId);
    }

  render() {
    if (this.props.cart != undefined) {
        return (
            <div className="App">
                <div className="main-wrapper wrapper">
                    <section>
                        <h1 className="cart-title">Mi Carrito</h1>
                        <div className="row">
                            <div className="alert-message-gbChk col-md-12">

                                {/* mensajes de error */}
                                <Alert
                                    mensaje={
                                        " El producto seleccionado está agotado. Eliminalo para poder continuar."
                                    }
                                    tipo={"error"}
                                />
                                <Alert
                                    mensaje={
                                        "Atención!.No es posible comprar estos productos en el mismo carrito. Te sugerimos comprarlos por separado así podemos ofrecerte más opciones de entrega."
                                    }
                                    tipo={"error"}
                                />
                                <Alert
                                    mensaje={"Ocurrio un error. Intente nuevamente más tarde."}
                                    tipo={"error"}
                                />
                                {/* mensajes de success */}
                                <Alert
                                    mensaje={
                                        "¡Buenas noticias! Tenés un descuento especial por producto combinado y bonificación."
                                    }
                                    tipo={"success"}
                                />
                                <Alert
                                    mensaje={
                                        "¡Buenas noticias! Tenés un descuento especial por bonificación."
                                    }
                                    tipo={"success"}
                                />
                                <Alert
                                    mensaje={
                                        "¡Buenas noticias! Tenés un descuento especial por producto combinado."
                                    }
                                    tipo={"success"}
                                />
                                <Alert
                                    mensaje={
                                        "¡Buenas noticias! Tenes un cupón de descuento aplicado."
                                    }
                                    tipo={"success"}
                                />

                                {/* mensajes de info (no se usa actualmente) */}
                                <div className="displaynone feedback feedback-info feedback-dismissible">
                                    <button type="button" className="feedback--btn-close"/>
                                    <p>
                                        This is a info alert with{" "}
                                        <a href="#" className="feedback-link">
                                            an example link
                                        </a>
                                        .
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="product-summary-gbChk row">
                            <div className="product-gbChk col-md-8">
                                <Product product={this.props.cart.products}/>
                            </div>
                            <div className="summary-gbChk col-md-4">
                                <Summary/>
                            </div>
                        </div>
                        <div className="carousel row">
                            <div className="col-md-12">
                                <Carousel/>
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
