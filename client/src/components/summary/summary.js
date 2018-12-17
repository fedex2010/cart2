import React, { Component } from "react";
import { connect } from "react-redux";

class Summary extends Component {
  render() {
    return (
      <div className="summary">
        <div className="summary-absolute">
          {/* resumen de compra */}
          <div className="purchase-summary">
            <div className="card cart-summary">
              {/*  ******** NOTA ********
                           Para que el contenedor tenga el estado" loading" 
                           se agrega la clase card--is-loading
                           <div className="card cart-summary card--is-loading">
                           ********* ***** ********
                        */}

              <p className="cart-seller">Vendedor: 12345566</p>

              <div className="cart-summary-header">
                <span className="cart-summary-title">Resumen de compra</span>
              </div>

              <ul className="summary-detail">
                <li>
                  <label>Subtotal</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li>
                  <label>IVA</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li>
                  <label>Garantías</label>
                  <span className="summary-detail-value">$21.296</span>
                </li>
                <li className="highlight-benefit">
                  <label>Descuento por cupón</label>
                  <span className="summary-detail-value">- $500</span>
                </li>
                <li className="benefits">
                  <label>Descuento especial</label>
                  <span className="summary-detail-value">- $500</span>
                </li>
                <li className="summary-total">
                  <label>Total</label>
                  <span className="summary-detail-value">$20.696,10</span>
                </li>
              </ul>

              {/* cupones y descuentos */}
              <div className="cart-additionals">
                <h5 className="cart-additionals-title">DESCUENTOS Y CUPONES</h5>

                <ul className="cart-additional-item">
                  <li>
                    <label>
                      <input type="radio" name="discount-coupon" /> Descuento
                      especial
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="discount-coupon" /> Tengo cupón
                      de descuento
                    </label>
                    <div className="coupon-apply-form">
                      <input
                        className="form-control form-control--sm"
                        type="text"
                        placeholder="Respetá mayúsculas y minúsculas"
                      />
                      <button className="button--primary button--sm button__is-loading">
                        Alicar
                      </button>
                      <p className="error-msj hide">
                        Código de cupón inválido.
                      </p>
                    </div>
                    <div className="coupon-applied">
                      <span className="coupon-code">CHKTEST</span>
                      <a href="#">Eliminar</a>
                    </div>
                  </li>
                </ul>

                <div className="cart-additional-item">
                  <label>
                    <input type="checkbox" /> Tengo cupón de descuento
                  </label>
                  <div className="coupon-apply-form">
                    <input
                      className="form-control form-control-error form-control--sm"
                      type="text"
                      placeholder="Respetá mayúsculas y minúsculas"
                      autoComplete="off"
                    />
                    <button className="button--primary button--sm">
                      Alicar
                    </button>
                    <p className="error-msj">Código de cupón inválido.</p>
                  </div>
                  <div className="coupon-applied">
                    <span className="coupon-code">CHKTEST</span>
                    <a href="#">Eliminar</a>
                  </div>
                </div>

                <div className="cart-additional-item">
                  <label>
                    <input type="checkbox" /> Sumá millas Aerolíneas Plus{" "}
                  </label>
                  <span className="gui-icon-question-mark-circle has-popover icon--xs icon--has-action">
                    <span className="popover_bottomCenter">
                      <p>
                        Comprando ciertos productos en nuestra web podés sumar
                        millas en Aerolíneas Plus
                      </p>
                      <p>
                        <a data-target="#arplus-tyc">Ver bases y condiciones</a>
                      </p>
                    </span>
                  </span>
                  <div className="coupon-apply-form">
                    <input
                      className="form-control form-control--sm"
                      type="number"
                      placeholder="Ingresá tu número de socio"
                      min="999999"
                      max="99999999"
                      autoComplete="off"
                    />
                    <button className="button--primary button--sm">
                      Alicar
                    </button>
                  </div>
                  <div className="coupon-applied">
                    <span className="coupon-code">1234567</span>
                    <a href="#">Eliminar</a>
                    <p className="coupon-msj">
                      Sumaste 35 millas Aerolíneas Plus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-actions">
              <a className="button--link" href="#">
                COMPRAR MÁS PRODUCTOS
              </a>
              <button type="button" className="button--primary">
                Continuar
              </button>
            </div>
          </div>
          {/* FIN resumen de compra */}
        </div>
      </div>
    );
  }
}
export default Summary;
