import React, { Component } from "react";

class GarbaError extends Component {
    constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  
  render() {
     
    return(
        <object type="image/svg+xml" data="{{config.cloudfront.url}}/statics/images/garba_error.svg" title="No hay resultados">
            <img src="{{config.cloudfront.url}}/statics/images/garba_error.svg" alt="No hay resultados"/>
        </object>
    );  
  }
}
export default GarbaError;
