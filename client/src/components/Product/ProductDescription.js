import React, { Component } from "react";
import ProductWarranty from "./ProductWarranty";
//import Modal from "../Modal/Modal";
import {  updateQuantityProduct,  deleteProduct,  selectProduct} from "../../actions/CartAction";
import { connect } from "react-redux";
import Cookie from "js-cookie";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdModal: {}
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

  _showDiscount(discount) {
    let classDiscount = "cart-item-tag cart-item-tag--success";
    let classDiscountNone = "cart-item-tag cart-item-tag--success displaynone";

    return !discount ? classDiscount : classDiscountNone;
  }

  _showModal(productId) {
    this.props.selectProduct(productId);
  }

  render() {
    let product = this.props.item;
    let percentage = this.props.percentage;
    let cartId = Cookie.get("cartId");
    let empresarias = Cookie.get("empresarias");

    let showStatus = this._showStatus(product.validations.saleable);
    let showDiscount = this._showDiscount(product.validations.saleable);
    if(!empresarias) {
      return (
        <div className="cart-item card">
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
              <span className={showDiscount}>Bonificación aplicada</span>
            </div>
            <div className="cart-item-column">
              <label>Precio:</label>
              <span className="cart-item-column-data">${product.price}</span>
            </div>
  
            <div className="cart-item-column">
              <label>Cantidad:</label>
              <select
                className="form-control form-control--sm"
                value={product.quantity}
                onChange={this._onSortChange.bind(this, product.product_id)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="cart-item-column">
              <label>Subtotal:</label>
              <strong className="cart-item-column-data">
                ${product.subtotal_price}
              </strong>
            </div>
  
            <a
              onClick={this._showModal.bind(this, product.product_id)}
              className="has-tooltip gui-icon-trash icon--md"
              data-toggle="modal"
              data-target="#delete-product"
            >
              <span className="tooltip_bottomCenter">Eliminar</span>
            </a>
          </div>
          <ProductWarranty
            item={product.warranties}
            products={product.product_id}
            warranty_id={product.warranty_id}
            percentage={percentage}
          />
        </div>
      );
    }else {
      return (
        <div className="cart-item card">
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
              <span className={showDiscount}>Bonificación aplicada</span>
            </div>
            <div className="cart-item-column column-empresarias">
              <label>Precio:</label>
              <span className="cart-item-column-data">${product.price} + IVA</span>
            </div>
  
            <div className="cart-item-column column-empresarias">
              <label>Cantidad:</label>
              <select
                className="form-control form-control--sm"
                value={product.quantity}
                onChange={this._onSortChange.bind(this, product.product_id)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="cart-item-column column-empresarias">
              <label>Subtotal:</label>
              <strong className="cart-item-column-data">
                ${product.subtotal_price} + IVA
              </strong>
            </div>
  
            <a
              onClick={this._showModal.bind(this, product.product_id)}
              className="has-tooltip gui-icon-trash icon--md"
              data-toggle="modal"
              data-target="#delete-product"
            >
              <span className="tooltip_bottomCenter">Eliminar</span>
            </a>
          </div>
        </div>
      );
    }
   
  }
}

const mapStateToProps = state => {
  return { product: state.cartReducer.product };
};

export default connect(
  mapStateToProps,
  { updateQuantityProduct, deleteProduct, selectProduct }
)(ProductDescription);
