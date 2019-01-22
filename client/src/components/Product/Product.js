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

  componentDidMount(){
      document.body.classList.remove('full-page--is-loading');
  }


  render() {
    let products = this.props.product;
    let percentage = this.props.percentage;
    
    if (products !== undefined) {
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
      );
    }
  }
}
export default Product;
