import React, { Component } from "react";
import ProductWarranty from "./ProductWarranty";
import Modal from "../Modal/Modal";
import { updateQuantityProduct ,deleteProduct} from "../../actions/CartAction";
import {connect} from "react-redux";
import Cookie from "js-cookie";

class ProductDescription extends Component {

    _onSortChange(product_id,e){
        let cartId = Cookie.get("cartId")
        let quantity = e.target.value;
        this.props.updateQuantityProduct(cartId,product_id,quantity)
    }


    render(){
        let product = this.props.item;
        let cartId = Cookie.get("cartId")
        return(
            <div className="cart-item card">
                <div className="cart-item-detail"  itemScope  itemType="http://schema.org/Offer">
                    <div className="cart-item-column">
                        <picture className="cart-item-image">
                            <img
                                src="https://via.placeholder.com/65x65"
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
                        <span className="cart-item-tag cart-item-tag--error">
                          Agotado
                        </span>
                        <span className="cart-item-tag cart-item-tag--success">
                          Bonificación aplicada
                        </span>
                    </div>
                    <div className="cart-item-column">
                        <label>Precio:</label>
                        <span className="cart-item-column-data">${product.price}</span>
                    </div>

                    <div className="cart-item-column">
                        <label>Cantidad:</label>
                        <select className="form-control form-control--sm" value={product.quantity} onChange={this._onSortChange.bind(this,product.product_id)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="cart-item-column">
                        <label>Subtotal:</label>
                        <strong className="cart-item-column-data">${product.subtotal_price}</strong>
                    </div>

                    {/* --  onClick={this._handleDeleteProduct.bind(this,product.product_id)} --*/}
                    <a className="has-tooltip gui-icon-trash icon--md" data-toggle="modal" data-target="#delete-product" >
                        <span className="tooltip_bottomCenter">Eliminar</span>
                    </a>
                </div>
                <ProductWarranty item={product.warranties}/>
                <Modal item={product.product_id} cartId={cartId}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state); // state
    return { product: state.cartReducer.product };
};

export default connect(
    mapStateToProps,
    { updateQuantityProduct ,deleteProduct }
)(ProductDescription)
