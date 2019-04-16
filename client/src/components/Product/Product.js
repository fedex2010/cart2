import React, { Component } from "react";
import ProductDescription from "./ProductDescription";
import Modal from "../Modal/Modal";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
        product: {}
    };
  }

  

  render() {
    if( Object.keys(this.props.cart) == 0 ){
      return null
    }
    
    let products = this.props.cart.products;
    let percentage = this.props.cart.percentage;

    if (products !== undefined && products.length > 0) {
        return (
          <div>
              {
                  products.map((product, i) => (<ProductDescription key={i} item={product} percentage={percentage}/>))
              }
              <Modal/>
          </div>
        );  
    } else {

      return (
          <div className="cart-empty">
            <p>No hay productos en tu carrito.</p>
          </div>
        )
    }
  }
}
export default Product;
