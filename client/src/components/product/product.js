import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: []
    };
  }

  render() {
    if(this.state.card !== null){
      return (
        <div className="cart-item card">
            <div className="cart-item-detail">
            <div className="cart-item-column">
                <picture className="cart-item-image">
                    <img src="https://via.placeholder.com/70x70" alt="product name"  itemProp="image"/>
                </picture>
            </div>
            <div className="cart-item-column">
                <a className="cart-item-name" href="#">Aire Acondicionado Split Philco 2236 Fg 2600 W PHS25C18N Frí Split Philco 2236 Fg 2600 W PHS25C18N Frí</a>
                <span className="cart-item-sold-out-tag">Agotado</span>
            </div>
            <div className="cart-item-column">
                <label>Precio:</label>
                <span>$99.999,99</span>
            </div>
            <div className="cart-item-column">
                <label>Cantidad:</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div>
            <div className="cart-item-column">
                <label>Subtotal:</label>
                <strong>$99.999,99</strong>
            </div>

            <a className="has-tooltip gui-icon-trash">
                <span className="tooltip_bottomCenter">Eliminar</span> 
            </a>
            </div>
            <div className="cart-item-warranties">
            <p><strong>¡Extendé tu protección</strong> y llevate <span className="benefits">GRATIS</span> 60 días de cobertura por robo y daños!</p>
            <ul className="cart-item-warranties--list">
                <li>
                    <label>
                        <input type="checkbox"/>
                        <a href="#">12 meses</a> de protección por <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox"/>
                        <a href="#">24 meses</a> de protección por <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox"/>
                        <a href="#">36 meses</a> de protección por <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox"/>
                        <a href="#">48 meses</a> de protección por <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                    </label>
                </li>
            </ul>
            </div>
        </div>
      );
    }else {
      return (
        <div className="cart-empty">
            <p>No hay productos en tu carrito.</p>
        </div>
      );
    }
    }
}
export default Product;


