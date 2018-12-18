import React, { Component } from "react";
import { connect } from "react-redux";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: []
    };
  }

  render() {
    if (this.state.card !== null) {
      return (
        <div>
          {/* item de carrito */}

          {/*  ******** NOTA ********
                Solamente paracuando es "venta empresas" al div contenedor 
                se le agrega la clase "cart-item--vta-empresas"
                <div className="cart-item card cart-item--vta-empresas" ...">

                -------------------------------------------------------------------------

                Para que el div contenedor tenga el loading
                se agrega la clase "card--is-loading"
                <div className="cart-item card card--is-loading" ... >

                --------------------------------------------------------------------------

                Cuando el producto esta agotado
                se le agrega la clase cart-item-sold-out
                <div className="cart-item card cart-item-sold-out" ... >
                
                ********* ***** ********
            */}
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
          {/* Garantía de reparación */}
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
                    src="https://d3lfzbr90tctqz.cloudfront.net/epi/resource/l/garantia-extendida/033335bd1fed9313f2feffb2b74890a79be791f3ff9ace2b2c6eafa535a5ee8f"
                    alt="product name"
                    itemProp="image"
                  />
                </picture>
              </div>
              <div className="cart-item-column cart-item-column-lg">
                <h3 className="cart-item-name">
                  Garantía de reparación por <strong>24 meses</strong>
                  <em>para Aire Acondicionado Split Philco 2236 Fg 2600</em>
                </h3>
              </div>
              <div className="cart-item-column">
                <label>Precio:</label>
                <span className="cart-item-column-data">$99</span>
              </div>
              <div className="cart-item-column">
                <label>Cantidad:</label>
                <select className="form-control form-control--sm" disabled>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className="cart-item-column">
                <label>Subtotal:</label>
                <strong className="cart-item-column-data">$99</strong>
              </div>

              <a className="has-tooltip gui-icon-trash icon--md">
                <span className="tooltip_bottomCenter">Eliminar</span>
              </a>
            </div>
          </div>
          {/**/}
          <div
            className="cart-item card cart-item--vta-empresas"
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
                    Aire Acondicionado Split{" "}
                  </a>
                </h3>
              </div>
              <div className="cart-item-column">
                <label>Precio:</label>
                <span className="cart-item-column-data">$999 + IVA</span>
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
                <strong className="cart-item-column-data">$999 + IVA</strong>
              </div>
              <a className="has-tooltip gui-icon-trash icon--md">
                <span className="tooltip_bottomCenter">Eliminar</span>
              </a>
            </div>
          </div>
          <div
            className="cart-item card cart-item--vta-empresas card--is-loading"
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
                    Aire Acondicionado Split Aire Acondicionado Split Aire
                    Acondicionado SplitAire Acondicionado SplitAire
                    Acondicionado Split
                  </a>
                </h3>
              </div>
              <div className="cart-item-column">
                <label>Precio:</label>
                <span className="cart-item-column-data">$99.999 + IVA</span>
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
                <strong className="cart-item-column-data">$99.999 + IVA</strong>
              </div>
              <a className="has-tooltip gui-icon-trash icon--md">
                <span className="tooltip_bottomCenter">Eliminar</span>
              </a>
            </div>
          </div>
          {/* item de carrito agotado */}
          <div
            className="cart-item card cart-item-sold-out"
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
                    Aire Acondicionado Ventana Surrey Frio 3010 Fg 3500 W UCVE12
                  </a>
                </h3>
                <span className="cart-item-tag cart-item-tag--error">
                  Agotado
                </span>
              </div>
              <a className="has-tooltip gui-icon-trash icon--md">
                <span className="tooltip_bottomCenter">Eliminar</span>
              </a>
            </div>
          </div>
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
