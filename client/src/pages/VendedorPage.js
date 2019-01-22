import React, { Component} from "react";
import { Redirect } from 'react-router';

class VendedorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false , errorSubmit : false};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    document.body.classList.remove('full-page--is-loading');
  }

  handleSubmit(event) {
    event.preventDefault();

    let data={};
    data.vendedor=event.target.vendedor.value;

    fetch("/api/cart/vendedor", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then( response => {
        this.setState({ redirect: true })
    }) 
    .catch( err => {
        console.log(err)
        this.setState({ redirect: false ,  errorSubmit : true})
    })
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/carrito'/>;
    }
    
    return (
          <div className="formContainer"> 
            <form method="POST" onSubmit={this.handleSubmit}>
                <section className="container gb-box">
                    <div>
                        <div id="tp-content-form">
                            <img id="garba-image" src="https://dj4i04i24axgu.cloudfront.net/statics/1.3.16/images/favicon_app.png" />
                            <img id="compu-image" src="https://d3lfzbr90tctqz.cloudfront.net/epi/resource/l/logo-compumundo-app/2b54edb5d6f7adb1175f580812b3c1449d526febee9875ff77a400fc9fd59c05" />
                            <p class="por-favor">Por favor, ingresá tu número de vendedor</p>
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

export default VendedorPage