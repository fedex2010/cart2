import React, { Component } from 'react';
import { connect } from 'react-redux';



class Summary extends Component {
 
  render() {
  return (
   <div className="summary">
        <div className="summary-fixed">
            <div className="card">
                Resumen de compra
                Subtotal $21.296
                Descuento especial - $600
                Total $20.696,10
                DESCUENTOS Y CUPONES

                Descuento especial
                Tengo cupón de descuento
            </div>

            <a href="#">COMPRAR MÁS PRODUCTOS</a>
            <input type="button" value="Continuar"/>
        </div>
   </div>
  );
 }
}
export default Summary;


