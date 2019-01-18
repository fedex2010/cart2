import React, { Component } from "react";

class CompuError extends Component {
    constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  
  render() {
     
    return(
        <object type="image/svg+xml" data="{{config.cloudfront.url}}/statics/images/compu_error.svg" title="No hay resultados">
            <img src="{{config.cloudfront.url}}/statics/images/compu_error.svg" alt="No hay resultados"/>
        </object>
    );  
  }
}
export default CompuError;
