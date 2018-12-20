import React, { Component } from "react";
import ProductWarranty from "./ProductWarranty"

class ProductDescription extends Component {

    render() {
        let product = this.props.item;
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
                                {product.product_id}
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
                        <span className="cart-item-column-data">$9.999</span>
                    </div>

                    <div className="cart-item-column">
                        <label>Cantidad:</label>
                        <select className="form-control form-control--sm">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="cart-item-column">
                        <label>Subtotal:</label>
                        <strong className="cart-item-column-data">$9.999</strong>
                    </div>

                    <a className="has-tooltip gui-icon-trash icon--md">
                        <span className="tooltip_bottomCenter">Eliminar</span>
                    </a>
                </div>
                <ProductWarranty item={product.validations}/>
            </div>
        )
    }
}

export default ProductDescription;