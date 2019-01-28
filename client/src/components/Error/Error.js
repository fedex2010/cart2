import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config/config";



class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

  componentDidMount(){
    document.body.classList.remove('full-page--is-loading');
  }

  _errorImage(brand){
      let svgGarba="garba_error.svg"
      let svgCompu="compu_error.svg"
      let svg = (brand === "garbarino")?svgGarba:svgCompu;
      let url = config.cloudfront.url+"/statics/images/"+svg
      return(
          <object type="image/svg+xml" data={url} title="No hay resultados">
              <img src={url} alt="No hay resultados"/>
          </object>
      );
  }
  
  render() {
    let error;
    let brand = window.xBrand;

    return(
        <div className="error-page" data-view="root">
            <div class="gb-wrapper gb--fixed-width">
                <div class="gb-error">
                    <div class="gb-error-image">
                        {this._errorImage(brand)}
                    </div>
                    <div class="gb-error-content">
                        <h2 class="gb-error-title">Ocurrió un error al procesar tu compra.</h2>
                        <p>Por favor, intentá realizarla nuevamente</p>
                        <button class="gb-button primary" id="reset-cookie-button">Volver al inicio</button>
                    </div>
                </div>  
                {/*<input type="hidden" id="errorGralAnalytics" value="{{eventAnalytics}}"/>*/}     
            </div>
           {/* <Prod/>*/}   
        </div>
    );  
  }
}

const mapStateToProps = state => {
    return { err : state.cartReducer.err, xBrand: state.cartReducer.xBrand };
  };
  
  export default connect(
    mapStateToProps 
  )(ErrorPage);
  
