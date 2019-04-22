import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import {  setLoginMessageClosedCookie } from "../../actions/CartAction";
import config from "../../config/config";


class Alert extends Component {
    constructor(props) {
    super(props);
    this.state = {
      mensaje: this.props.mensaje,
      tipo: this.props.tipo,
      showAlert:true,
      showSaleable:true
    };
  }

  showLoginForm(){
    window.gb.my_account.login.open();
  }

   _closeAlert(){
        this.setState({ showAlert: false });
    }

   _closeSalable(){
        this.setState({ showSaleable: false });
    }

  _isBonificacion(cart){
      let cssMsj = "feedback feedback-success feedback-dismissible";
      let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
      let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
      let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status === 'VALID' && p.promotion.total_discount > 0;}).length > 0;
      let hasBonification = hasPriceMatchingDiscount || hasPolcom;
      cart.couponAmount=0;
      cart.discount_details.map(function(discount_detail) {
          switch (discount_detail.source) {
              case "COUPON":
                  cart.couponAmount +=discount_detail.amount;
                  break;
          }
      });

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
      if(msj !== "") {
          return(
              <div className={cssMsj} style={{display: this.state.showAlert ? 'block' : 'none' }}>
                  <button type="button" onClick={this._closeAlert.bind(this)} className="feedback--btn-close" />
                  {msj}
              </div>
          );
      }
  }

  _isSaleable(cart){
      let cssMsj = "feedback feedback-error feedback-dismissible";
      let saleableFalse = " El producto seleccionado está agotado. Eliminalo para poder continuar.";
      let salable = false;

      cart.products.forEach((product)=>{
          if(!product.validations.saleable){
              salable=true;
          }
      })

      if(salable){
          return(
              <div className={cssMsj} style={{display: this.state.showSaleable ? 'block' : 'none' }}>
                  <button type="button" onClick={this._closeSalable.bind(this)}  className="feedback--btn-close" />
                  {saleableFalse}
              </div>
          );
      }
  }

  _isPriceChange(cart){
        let cssMsj = "feedback feedback-info feedback-dismissible";
        let msg = "";
        if (cart.price_change){
            let changesInPrice = "";
            let changesInWarranty = "";
            cart.products.forEach((product,key)=>{
                if (product.hasOwnProperty('price_delta')){
                    if (product.price_delta > 0){
                        changesInPrice += "UP";
                    } else if (product.price_delta < 0){
                        changesInPrice += "DOWN";
                    }
                    if (product.hasOwnProperty('delta_warranty_price')){
                        if (product.delta_warranty_price > 0){
                            changesInWarranty += "UP";
                        } else if (product.delta_warranty_price < 0){
                            changesInWarranty += "DOWN";
                        }
                    }
                }
            })

            let pricesUp = (changesInPrice.match(/UP/g) || []).length;
            let pricesDown = (changesInPrice.match(/DOWN/g) || []).length;
            let warrantiesUP = (changesInWarranty.match(/UP/g) || []).length;
            let warrantiesDown = (changesInWarranty.match(/DOWN/g) || []).length;

            if (pricesUp > 0){
                if (pricesUp > 1){
                    if(warrantiesUP > 0 || warrantiesDown > 0){
                        msg =  "Algunos productos y garantías han cambiado sus precios.";
                    } else{
                        msg =  "Algunos productos han cambiado su precio.";
                    }
                }else if(warrantiesUP > 0 || warrantiesDown > 0){
                    msg = "Algunos productos y garantías han cambiado sus precios.";
                }else if (pricesDown > 0){
                    msg =  "Algunos productos han cambiado su precio.";
                }else{
                    msg = "Hubo un cambio en el precio de tu producto.";
                }
            }else if(pricesDown > 0){
                if(pricesDown > 1){
                    if(warrantiesDown > 0){
                        msg = "¡Buenas noticias! Algunos productos y garantías bajaron de precio.";
                    }else if(warrantiesUP > 0){
                        msg =  "Algunos productos y garantías han cambiado sus precios.";
                    }else {
                        msg = "¡Buenas noticias! Algunos productos bajaron de precio.";
                    }
                }else if(warrantiesDown > 0){
                    msg = "¡Buenas noticias! Tu producto y la garantía bajaron de precio.";
                }else if(warrantiesUP > 0){
                    msg =  "Algunos productos y garantías han cambiado sus precios.";
                }else{
                    msg = "¡Buenas noticias! Tu producto bajó de precio.";
                }
            }else if(warrantiesUP > 0){
                if (warrantiesUP > 1 || warrantiesDown > 0){
                    msg = "Algunas garantías han cambiado su precio.";
                }else {
                    msg = "Hubo un cambio en el precio de tu garantía.";
                }
            }else{
                if (warrantiesDown > 1){
                    msg = "¡Buenas noticias! Algunas garantías bajaron de precio.";
                }else{
                    msg = "¡Buenas noticias! Tu garantía bajó de precio.";
                }
            }
        }

        if(msg){
            return(
                <div className={cssMsj}>
                    <button type="button" onClick={this._closeSalable.bind(this)}  className="feedback--btn-close" />
                    {msg}
                </div>
            );
        }
    }

  _showError(err){
    if( this.props.err.cause && this.props.err.cause.code ){
        let classError = (this.props.err.cause && this.props.err.cause.code && (this.props.err.cause.code == 404 || this.props.err.cause.code == 403))? "error-msj" : "error-msj hide";
        let cssMsj = "feedback feedback-error feedback-dismissible " + classError;
    
        let errorFalse
        
        if( this.props.err.cause.code == 404 ){
            errorFalse = "Ocurrio un error. Intente nuevamente más tarde.";
        }else if( this.props.err.cause.code == 403 ){
            errorFalse = "No es posible agregar más de 10 productos diferentes en el mismo carrito";
        }
    
          return(
              <div className={cssMsj} style={{display: this.state.showSaleable ? 'block' : 'none' }}>
                  <button type="button" onClick={this._closeSalable.bind(this)}  className="feedback--btn-close" />
                  {errorFalse}
              </div>
          );
    
    }else{
        return null
    }
  }

  setCookieMonth(){
    this.props.setLoginMessageClosedCookie()
  }

  _showLoginMessage(){
    let gb_session_id = Cookie.get("gb_session_id");
    let gb_login_message_closed = Cookie.get("gb_login_message_closed");
    
    let url = config.getBasePathImages()+"/statics/images/checkout_profile.svg"

    if(gb_session_id || gb_login_message_closed){
        return null
    }else{
       return ( <div className="alert-message-gbChk col-md-12">
            <div class="gb-alert-box alert alert-neutral alert-signup" id="myAccountLoginCart">
                <img src={url} alt="profile" />
                <span class="deleteProductText">¡Registrate o inicia session para ver tus compras, favoritos y disfrutar de beneficios  
                <a class="gb-button primary" id="myAccountLogin" data-toggle="modal" data-target="#myaccount-registration" onClick={this.showLoginForm.bind(this)} >Ingresar</a></span>
                    <span type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span onClick={this.setCookieMonth.bind(this)} aria-hidden="true">×</span>
                </span>
                <div class="displaynone miAccountBody"></div>
            </div>
       </div> )
    }
  }
    
  render() {
    
    if (this.props.cart !== undefined && typeof this.props.cart.products !== "undefined") {    
        return(
            <div className="alert-message-gbChk col-md-12">
                {this._isBonificacion(this.props.cart)}
                {this._isSaleable(this.props.cart)}
                {this._isPriceChange(this.props.cart)}
                {this._showError(this.props.err)}
                {this._showLoginMessage()}
            </div>
        );
    }else{
        //si falla el carrito entra aca
        return(
            <div className="alert-message-gbChk col-md-12">
                {this._showError(this.props.err)}
            </div>
        );
    }
  }
}


const mapStateToProps = state => {
    return { err: state.cartReducer.err, operationStatus: state.cartReducer.operationStatus };
};

export default connect(
                    mapStateToProps,
                    {setLoginMessageClosedCookie}) (Alert)
