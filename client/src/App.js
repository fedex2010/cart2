import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";


//import Alert from "./components/alert/alert";
import Product from "./components/product/product";
import Summary from "./components/summary/summary";
import Carousel from "./components/carousel/carousel";
// import { cartAction } from "./actions/cartAction";


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // cartAction: () => dispatch(cartAction())
});



class App extends Component {
  //   cartAction = event => {
  //     this.props.cartAction();
  //   };

  render() {
    return (
      <div className="App">
        
        <div className="main-wrapper wrapper">
          <section>
            <h1 className="cart-title">Mi Carrito</h1>
            <div className="row">
              <div className="alert-message-gbChk col-md-12">
                {/* mensajes de error 
                <Alert mensaje={" El producto seleccionado está agotado. Eliminalo para poder continuar."} tipo={"error"}/>
                <Alert mensaje={"Atención!.No es posible comprar estos productos en el mismo carrito. Te sugerimos comprarlos por separado así podemos ofrecerte más opciones de entrega."} tipo={"error"}/>
                <Alert mensaje={"Ocurrio un error. Intente nuevamente más tarde."} tipo={"error"}/>
                mensajes de success 
                <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por producto combinado y bonificación."} tipo={"success"}/>
                <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por bonificación."} tipo={"success"}/>
                <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por producto combinado."} tipo={"success"}/>
                <Alert mensaje={"¡Buenas noticias! Tenes un cupón de descuento aplicado."} tipo={"success"}/>
                
                 mensajes de info (no se usa actualmente)
                <div className="feedback feedback-info feedback-dismissible">
                  <button type="button" className="feedback--btn-close" />
                  <p>
                    This is a info alert with{" "}
                    <a href="#" className="feedback-link">
                      an example link
                    </a>
                    .
                  </p>
                </div>
                */}
              </div>  
            </div> 
            <div className="product-summary-gbChk row">
              <div className="product-gbChk col-md-8">
                <Product/>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
