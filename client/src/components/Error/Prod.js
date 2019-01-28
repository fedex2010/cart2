import React, { Component } from "react";

class Prod extends Component {
    constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  
  render() {
     
    return(
        <div>
            <h3 id="stack-title" class="error-title">{{message}}</h3>
            <pre id="stack-error" class="error-detail">{{stack}}</pre>
        </div>

    );  
  }
}
export default Prod;
