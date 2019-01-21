import React, { Component } from "react";
import { Redirect } from 'react-router';
import Cookie from "js-cookie";
import GarbaError from "./GarbaError";
import CompuError from "./CompuError";
//import Prod from "./Prod";


class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


  componentDidMount(){
    document.body.classList.remove('full-page--is-loading');
  }

    _resetCookie(){
        setTimeout( function() {
                document.getElementById("reset-cookie-button").onclick = function () {
                document.cookie = "epi.context=; expires=-1; path=/;";
                document.cookie = "cartId=; expires=-1; path=/;";
    
                window.location.replace("/carrito/resetCookieAndGoHome");
            }
        }, 500)    
    }

  
  render() {
      let error;
      let brand = Cookie.get("garbarino");
     if(brand){
        error = <GarbaError/>
     }else{
        error = <CompuError/>
     }
    
    return(
        <div className="error-page" data-view="root">
            <div class="gb-wrapper gb--fixed-width">
                <div class="gb-error">
                    <div class="gb-error-image">
                        {error}
                    </div>
                    <div class="gb-error-content">
                        <h2 class="gb-error-title">Ocurrió un error al procesar tu compra.</h2>
                        <p>Por favor, intentá realizarla nuevamente</p>
                        <button class="gb-button primary" id="reset-cookie-button">Volver al inicio</button>

                    </div>
                </div>          
            </div>
        </div>
    );  
  }
}
export default Error;
