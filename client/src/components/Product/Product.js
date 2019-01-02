import React, { Component } from "react";
import ProductDescription from "./ProductDescription";


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
        product: {}
    };
  }


  render() {
    let products = this.props.product;
    let percentage = this.props.percentage;
    if (products !== undefined) {
      return (
        <div>
            {
                products.map(product => (<ProductDescription item={product} percentage={percentage}/>))
            }
        </div>
      );
    } else {
      return (
        <div className="cart-empty">
          <p>No hay productos en tu carrito.</p>
        </div>
      );
    }
  }
}
export default Product;
