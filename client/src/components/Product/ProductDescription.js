import React, { Component } from "react";
import ProductWarranty from "./ProductWarranty";
import {  updateQuantityProduct,  deleteProduct,  selectProduct} from "../../actions/CartAction";
import { connect } from "react-redux";
import Cookie from "js-cookie";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdModal: {},
      operationStatus:"SUCCESSFUL"
    };
  }

  _onSortChange(product_id, e) {
    let cartId = Cookie.get("cartId");
    let quantity = e.target.value;
    this.props.updateQuantityProduct(cartId, product_id, quantity);
  }

  _showStatus(saleable) {
    let clasStatus = "cart-item-tag cart-item-tag--error";
    let clasStatusNone = "cart-item-tag cart-item-tag--error displaynone";

    return !saleable ? clasStatus : clasStatusNone;
  }


  _showModal(product) {
    this.props.selectProduct(product);
  }

  render() {
    let product = this.props.item;
    let percentage = this.props.percentage;
    let showStatus = this._showStatus(product.validations.saleable);
    let isDisabled = this.props.operationStatus === "LOADING" ? true : false;
    let idProduct  = "productId_"+product.product_id;
    let empresarias = (Cookie.get("empresarias")==true?true:false);

    return (
      <div className="cart-item card" id={idProduct}>
        <div
          className="cart-item-detail"
          itemScope
          itemType="http://schema.org/Offer"
        >
          <div className="cart-item-column">
            <picture className="cart-item-image">
              <img
                src={product.main_image.url}
                alt="product name"
                itemProp="image"
              />
            </picture>
          </div>
          <div className="cart-item-column cart-item-column-lg">
            <h3 className="cart-item-name">
              <a href="#" title="" itemProp="url">
                {product.description}
              </a>
            </h3>
            <span className={showStatus}>Agotado</span>
          </div>
          <div className={`${empresarias ? 'cart-item-column column-empresarias' : 'cart-item-column'}`}>
            <label>Precio:</label>
            <span className="cart-item-column-data">${product.price} {`${empresarias ? '+ IVA' : ''}`}</span>
          </div>

          <div className="cart-item-column">
            <label>Cantidad:</label>
            <select
              className="form-control form-control--sm"
              value={product.quantity}
              onChange={this._onSortChange.bind(this, product.product_id)}
              disabled={isDisabled}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className={`${empresarias ? 'cart-item-column column-empresarias' : 'cart-item-column'}`}>
            <label>Subtotal:</label>
            <strong className="cart-item-column-data">
              ${product.subtotal_price} {`${empresarias ? '+ IVA' : ''}`}
            </strong>
          </div>

          <a
            onClick={this._showModal.bind(this, product)}
            className="has-tooltip gui-icon-trash icon--md"
            data-toggle="modal"
            data-target="#delete-product"
          >
            <span className="tooltip_bottomCenter">Eliminar</span>
          </a>
        </div>
        <ProductWarranty
          current={product}
          item={product.warranties}
          products={product.product_id}
          warranty_id={product.warranty_id}
          percentage={percentage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { product: state.cartReducer.product, operationStatus: state.cartReducer.operationStatus };
};

export default connect(
  mapStateToProps,
  { updateQuantityProduct, deleteProduct, selectProduct }
)(ProductDescription);
