import config from "../config/config";
import {Redirect} from "react-router-dom";
import React, { Component} from "react";
import history from '../history';
import { connect } from "react-redux";

class Vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {  errorSubmit : false};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    document.body.classList.remove('full-page--is-loading');
  }

  handleSubmit(event) {
    event.preventDefault();

    let data={};
    data.vendedor=event.target.vendedor.value;

    fetch("/carrito/vendedor", {
        method: "POST",
        credentials: 'include' ,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then( response => {
        return history.push('/carrito')
    }) 
    .catch( err => {
        console.log(err)
        this.setState({errorSubmit : true})
    })
  }

  render() {    
    return (
          <div className="formContainer"> 
            <form method="POST" onSubmit={this.handleSubmit}>
                <section className="container gb-box">
                    <div>
                        <div id="tp-content-form">
                            <img id="garba-image" src="https://dj4i04i24axgu.cloudfront.net/statics/1.3.16/images/favicon_app.png" />
                            <img id="compu-image" src="https://d3lfzbr90tctqz.cloudfront.net/epi/resource/l/logo-compumundo-app/2b54edb5d6f7adb1175f580812b3c1449d526febee9875ff77a400fc9fd59c05" />
                            <p className="por-favor">Por favor, ingresá tu número de vendedor</p>
                            <hr/>
                            {this.state.errorSubmit}
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                                    <label className="subtitles">Número de Vendedor<span className="required">*</span> </label>
                                    <input id="apynTxt" name="vendedor" className="form-control" />
                                </div>
                            </div>
                            <button id="purchaseButton" type="submit" className="btn btn-primary btn-lg">Ingresar</button>
                        </div>
                    </div>
                </section>
            </form>
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
    { }
  )(Vendedor);

  