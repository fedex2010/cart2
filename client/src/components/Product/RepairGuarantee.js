import React, { Component } from "react";
import { connect } from "react-redux";

class RepairGuarantee extends Component {
 
  render() {
    
    return (
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
    
    );
  }
}
export default RepairGuarantee;
