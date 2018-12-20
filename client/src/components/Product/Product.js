import React, { Component } from "react";
import { connect } from "react-redux";

//import RepairGuarantee from "./RepairGuarantee";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: []
    };
  }

  render() {
     {/*

      -----item de carrito agotado add class - cart-item-sold-out - to cart-item
      -----item de carrito venta empresaria add class - cart-item--vta-empresas - al contenedor con class cart-item
      -----loading de carrito add class - card--is-loading - al contenedor con class cart-item

     */}
      console.log("********------**********");
      console.log(this.props.product);
      console.log("*********------dev*********");
    if (this.state.card !== null) {
      return (
        <div>

          <div
            className="cart-item card"
            itemScope
            itemType="http://schema.org/Product"
          >
            <div
              className="cart-item-detail"
              itemScope
              itemType="http://schema.org/Offer"
            >
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
                    Aire Acondicionado Split Philco 2236 Fg 2600 W ire
                    Acondicionado Split Philco 2236 Fg 2600 W
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
            <div className="cart-item-warranties">
              <p>
                <strong>¡Extendé tu protección</strong> y llevate{" "}
                <span className="benefits">GRATIS</span> 60 días de cobertura
                por robo y daños!
              </p>
              <ul className="cart-item-warranties--list">
                <li>
                  <label>
                    <input type="checkbox" />
                    <a href="#">12 meses</a> de protección por{" "}
                    <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    <a href="#">24 meses</a> de protección por{" "}
                    <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    <a href="#">36 meses</a> de protección por{" "}
                    <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    <a href="#">48 meses</a> de protección por{" "}
                    <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                  </label>
                </li>
              </ul>
            </div>
          </div>
           {/* components de garantía de reparacion
            <RepairGuarantee/>
          */}

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
