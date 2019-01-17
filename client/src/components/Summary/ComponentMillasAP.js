import React, { Component } from "react";
import { connect } from "react-redux";
import {setLoyalties,deleteLoyalties} from "../../actions/CartAction";
import Cookie from "js-cookie";

class ComponentMillasAP extends Component {

  constructor() {
     super();
     this.state = {
        millasAP: true,
        checkedAP: false,
        input:""
     }
  }
  handleCheckAP = () => {
    this.setState({checkedAP: !this.state.checkedAP});
  }

  _setMillas(){
      let cartId = Cookie.get("cartId");
      this.props.setLoyalties(this.state.input,cartId);
  }

  _setMillasEmpty(){
      let cartId = Cookie.get("cartId");
      this.props.deleteLoyalties(cartId);
  }

  _showDelete(){
      if (this.props.addMillasAP && this.props.addMillasAP[0] && this.props.addMillasAP[0].code) {

          console.log(this.props.addMillasAP)
          console.log(typeof this.props.addMillasAP)
          return (
              <div className="coupon-applied">
                  <span className="coupon-code">{this.props.addMillasAP[0].code}</span>
                  <button className="link-to-button" onClick={this._setMillasEmpty.bind(this)}>Eliminar</button>
                  <p className="coupon-msj">
                      Sumaste {this.props.addMillasAP[0].value} millas Aerolíneas Plus.
                  </p>
              </div>
          );
      }
  }

    _handleInput(e){
        let couponId = e.target.value;
        this.setState({ input: couponId });
    }

    _onChange() {
        this.setState( {
            millasAP: false
        });
    }

  _showAdd(displaynoneCheckboxAP){
      if (this.props.addMillasAP && this.props.addMillasAP[0] && !this.props.addMillasAP[0].code) {
      return(
          <div>
              <label>
                  <input
                      type="checkbox"
                      onChange={this.handleCheckAP}/> Sumá millas Aerolíneas Plus{" "}
              </label>
              <span className="gui-icon-question-mark-circle has-popover icon--xs icon--has-action">
                    <span className="popover_bottomCenter">
                        <p>
                            Comprando ciertos productos en nuestra web podés sumar
                            millas en Aerolíneas Plus
                        </p>
                        <p>
                            <button className="link-to-button" data-target="#arplus-tyc">Ver bases y condiciones</button>
                        </p>
                    </span>
                </span>
              <div className={displaynoneCheckboxAP}>
                  <div className="coupon-apply-form">
                      <input
                          className="form-control form-control--sm"
                          type="number"
                          placeholder="Ingresá tu número de socio"
                          min="999999"
                          max="99999999"
                          autoComplete="off"
                          onChange={this._handleInput.bind(this)}
                      />
                      <button className="button--primary button--sm" onClick={this._setMillas.bind(this)}>
                          Alicar
                      </button>
                  </div>
              </div>
          </div>
      );
      }
  }

  render() {
    let displaynoneCheckboxAP = 'displaynone';

    if(this.state.checkedAP){
        displaynoneCheckboxAP ='';
    }

    if(typeof this.props.products !== "undefined" && this.props.products !== "" ){
        let loyalties = "cart-additional-item millasAPBorder displaynone";
        let products = this.props.products
        products.forEach((i=>{
            if(typeof i.loyalties !== "undefined"){
                loyalties = "cart-additional-item millasAPBorder";
            }
        }))
        return (
            <div className={loyalties}>
                {this._showAdd(displaynoneCheckboxAP)}
                {this._showDelete()}
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
    
  }
}

const mapStateToProps = state => {
    return { item: state.cartReducer.item };
};

export default connect(
    mapStateToProps,
    { setLoyalties ,deleteLoyalties }
)(ComponentMillasAP)

