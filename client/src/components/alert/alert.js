
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Alert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mensaje: this.props.mensaje,
      tipo: this.props.tipo
    };
  }

  render() {

    if(this.state.tipo === "success"){
      console.log("TIPO:", this.state.tipo)
      return (
        <div className="feedback feedback-success feedback-dismissible">
          <button type="button" className="feedback--btn-close"></button>
          {this.state.mensaje}
        </div>
      );
    }
    else {
      console.log("NO ENTRA TIPO:", this.state.tipo)
      return (
        <div className="feedback feedback-error feedback-dismissible">
          <button type="button" className="feedback--btn-close"></button>
          {this.state.mensaje}
        </div>
      );
    }
    
    }
}
export default Alert;


