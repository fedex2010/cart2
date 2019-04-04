import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config/config";
import {fetchNewCart} from "../../actions/CartAction";

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        //QUIZAS ESTARIA MEJOR Q FUERA DENTRO DEL REDUCER en el state original
        let homeUrl = ( window.xBrand === "garbarino" )?config.home_url.garbarino:config.home_url.compumundo;

        this.state = {
            brand : window.xBrand,
            homeUrl : homeUrl       
        };

        this.createNewCart = this.createNewCart.bind(this);
    }

  componentDidMount(){
    document.body.classList.remove('full-page--is-loading');
  }

  createNewCart(){
    this.props.fetchNewCart()
  }

  _errorImage(){
      let svgGarba="garba_error.svg"
      let svgCompu="compu_error.svg"
      let svg = (this.state.brand === "garbarino")?svgGarba:svgCompu;
      let url = config.cloudfront.url+"/static/images/"+svg
      return(
          <object type="image/svg+xml" data={url} title="No hay resultados">
              <img src={url} alt="No hay resultados"/>
          </object>
      );
  }
  
  render() {

    return(
        <div className="error-page" data-view="root">
            <div className="gb-wrapper gb--fixed-width">
                <div className="gb-error">
                    <div className="gb-error-image">
                        {this._errorImage()}
                    </div>
                    <div className="gb-error-content">
                        <h2 className="gb-error-title">Ocurrió un error al procesar tu compra.</h2>
                        <p>Por favor, intentá realizarla nuevamente</p>
                        <button onClick={this.createNewCart} className="gb-button primary" id="reset-cookie-button">Volver al inicio</button>
                    </div>
                </div>
            </div>
        </div>
    );  
  }
}

const mapStateToProps = state => {
    return { err : state.cartReducer.err, xBrand: state.cartReducer.xBrand };
  };
  
  export default connect(
    mapStateToProps,{ fetchNewCart }
  )(ErrorPage);
  
