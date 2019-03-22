import React, { Component } from "react";
import { connect } from "react-redux";
import {setLoyalties,deleteLoyalties} from "../../actions/CartAction";
import Cookie from "js-cookie";

class ComponentMillasAP extends Component {

  constructor() {
     super();
     this.state = {
        millasAP: true,
        checkedAP: true,
        input:"",
        value: ''
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
      this.setState({value: ""});
      this.props.deleteLoyalties(cartId);
  }

  _showDelete(){
      if (this.props.addMillasAP && this.props.addMillasAP[0] && this.props.addMillasAP[0].code) {
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

    _handleInput = ({target: {value}}) => {
        this.setState(state => value.length <= 8 && !isNaN(Number(value)) && {value} || state)
        this.setState({ input: value })
    }

    _onChange() {
        this.setState( {
            millasAP: false
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            let cartId = Cookie.get("cartId");
            this.props.setLoyalties(this.state.input,cartId);
        }
      }

  _showAdd(displaynoneCheckboxAP){
      if (this.props.addMillasAP && this.props.addMillasAP[0]) {
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
                                <button className="link-to-button" data-target="#arplus-tyc" data-toggle="modal"
                                >Ver bases y condiciones</button>
                            </p>
                        </span>
                    </span>
                    <div className={this.state.checkedAP === true ? "displaynone":"" }>
                        {!this.props.addMillasAP[0].code ? (
                            <div className="coupon-apply-form">
                                <input
                                    className="form-control form-control--sm"
                                    type="text"
                                    pattern="[0-9]{8}"
                                    placeholder="Ingresá tu número de socio"
                                    minLength="999999"
                                    maxLength="99999999"
                                    autoComplete="off"
                                    onChange={this._handleInput.bind(this)}
                                    onKeyPress={this._handleKeyPress.bind(this)}
                                    value={this.state.value}
                                    autofocus="true"
                                />
                                <button className="button--primary button--sm" onClick={this._setMillas.bind(this)}>
                                    Aplicar
                                </button>
                            </div>
                        
                        ) : (
                            <div></div>
                        )}
                    </div>
             
            </div>
        );
      }
  }

  render() {
    let displaynoneCheckboxAP = 'displaynone';

    if(!this.state.checkedAP){
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
                <div className={this.state.checkedAP === true ? "displaynone":"" }>
                    {this._showDelete()}
                </div>    
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
    return { err: state.cartReducer.err };
};

export default connect(
    mapStateToProps,
    { setLoyalties ,deleteLoyalties }
)(ComponentMillasAP)

