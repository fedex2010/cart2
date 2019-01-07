import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: this.props.mensaje,
      tipo: this.props.tipo
    };
  }

    _closeAlert(){
      alert("cierroooo")
    }

  _isBonificacion(cart){
      let cssMsj = "feedback feedback-success feedback-dismissible";
      let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
      let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
      let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status == 'VALID' && p.promotion.total_discount > 0;}).length > 0;
      let hasBonification = hasPriceMatchingDiscount || hasPolcom;
      let hasCoupon = cart.couponAmount > 0;
      let msj = "";

      if(hasCoupon){
          msj = "¡Buenas noticias! Tenes un cupón de descuento aplicado."
      }else{
          if(hasCrosseling && hasBonification){
            msj = "¡Buenas noticias! Tenés un descuento especial por producto combinado y bonificación.";
          }else if(hasCrosseling){
            msj = "¡Buenas noticias! Tenés un descuento especial por producto combinado.";
          }else if(hasBonification){
            msj = "¡Buenas noticias! Tenés un descuento especial por bonificación.";
          }
      }

      return(
          <div className={cssMsj}>
              <button type="button" onClick={this._closeAlert.bind(this)} className="feedback--btn-close" />
              {msj}
          </div>
      );

  }

  _isSaleable(cart){
      let cssMsj = "feedback feedback-error feedback-dismissible";
      let saleableFalse = " El producto seleccionado está agotado. Eliminalo para poder continuar.";
      let alert = [];
      let salable = false;

      cart.products.map((product)=>{

          if(!product.validations.saleable){
              salable=true;
          }
      })

      if(salable){
          return(
              <div className={cssMsj}>
                  <button type="button" className="feedback--btn-close" />
                  {saleableFalse}
              </div>
          );
      }
  }

  render() {
      if (this.props.cart !== undefined && typeof this.props.cart.products !== "undefined") {
          return(
              <div className="alert-message-gbChk col-md-12">
                  {this._isBonificacion(this.props.cart)}
                  {this._isSaleable(this.props.cart)}
              </div>
          );
      }else{
          return(
              <div className="alert-message-gbChk col-md-12">
                  <div className="displaynone">
                      <button type="button" className="feedback--btn-close" />
                  </div>
              </div>
          );
      }
  }
}
export default Alert;
