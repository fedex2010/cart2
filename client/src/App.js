/*
 src/App.js
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.scss";
// import { cartAction } from "./actions/cartAction";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // cartAction: () => dispatch(cartAction())
});

class App extends Component {
  //   cartAction = event => {
  //     this.props.cartAction();
  //   };

  render() {
    return (
      <div className="App">
        <header>HEADER NORMI</header>

        <div className="wrapper">
          <section>
            <h1 className="cart-title">Mi Carrito</h1>

            {/* mensajes de error */}
            <div className="feedback feedback-error feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>
                El producto seleccionado está agotado. Eliminalo para poder
                continuar.
              </p>
            </div>

            <div className="feedback feedback-error feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>
                <strong>Atención!</strong> No es posible comprar estos productos
                en el mismo carrito.
                <br />
                Te sugerimos comprarlos por separado así podemos ofrecerte más
                opciones de entrega.
              </p>
            </div>

            <div className="feedback feedback-error feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>Ocurrio un error. Intente nuevamente más tarde.</p>
            </div>

            {/* mensajes de success */}
            <div className="feedback feedback-success feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>
                ¡Buenas noticias! Tenés un descuento especial por producto
                combinado y bonificación.
              </p>
            </div>

            <div className="feedback feedback-success feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>
                ¡Buenas noticias! Tenés un descuento especial por bonificación.
              </p>
            </div>

            <div className="feedback feedback-success feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>
                ¡Buenas noticias! Tenés un descuento especial por producto
                combinado.
              </p>
            </div>

            <div className="feedback feedback-success feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>¡Buenas noticias! Tenes un cupón de descuento aplicado.</p>
            </div>

            {/* mensajes de info (no se usa actualmente) */}
            <div className="feedback feedback-info feedback-dismissible">
              <button type="button" className="feedback--btn-close" />
              <p>
                This is a info alert with{" "}
                <a href="#" className="feedback-link">
                  an example link
                </a>
                .
              </p>
            </div>

            <div className="row">
              <div className="col-sm-7 col-md-8 ">
                {/* item de carrito */}
                <div className="cart-item card">
                  <div className="cart-item-detail">
                    <div className="cart-item-column">
                      <picture className="cart-item-image">
                        <img
                          src="https://via.placeholder.com/70x70"
                          alt="product name"
                          itemProp="image"
                        />
                      </picture>
                    </div>
                    <div className="cart-item-column">
                      <a className="cart-item-name" href="#">
                        Aire Acondicionado Split Philco 2236 Fg 2600 W PHS25C18N
                        Frí Split Philco 2236 Fg 2600 W PHS25C18N Frí
                      </a>
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
                    <p>
                      <strong>¡Extendé tu protección</strong> y llevate{" "}
                      <span className="benefits">GRATIS</span> 60 días de
                      cobertura por robo y daños!
                    </p>
                    <ul className="cart-item-warranties--list">
                      <li>
                        <label>
                          <input type="checkbox" />
                          <a href="#">12 meses</a> de protección por{" "}
                          <strong>$1.549</strong> ó 12 cuotas de{" "}
                          <strong>$192</strong>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox" />
                          <a href="#">24 meses</a> de protección por{" "}
                          <strong>$1.549</strong> ó 12 cuotas de{" "}
                          <strong>$192</strong>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox" />
                          <a href="#">36 meses</a> de protección por{" "}
                          <strong>$1.549</strong> ó 12 cuotas de{" "}
                          <strong>$192</strong>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox" />
                          <a href="#">48 meses</a> de protección por{" "}
                          <strong>$1.549</strong> ó 12 cuotas de{" "}
                          <strong>$192</strong>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* carrito bacio */}
                <div className="cart-empty">
                  <p>No hay productos en tu carrito.</p>
                </div>
              </div>

              <div className="col-sm-5 col-md-4">
                {/* resumen de compra */}
                <div className="card">
                  Resumen de compra Subtotal $21.296 Descuento especial - $600
                  Total $20.696,10 DESCUENTOS Y CUPONES Descuento especial Tengo
                  cupón de descuento
                </div>

                <a href="#">COMPRAR MÁS PRODUCTOS</a>
                <input type="button" value="Continuar" />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                {/* carrusell */}
                <div className="card">
                  <div className="card-title">
                    <h5 className="card-title">
                      ¡Aprovechá y sumá al carrito estas ofertas!
                    </h5>
                  </div>
                  <div className="carrusel swiper-container">
                    <a className="swiper-button-prev gb-carousel-module-control gb--prev" />
                    <a className="swiper-button-next gb-carousel-module-control gb--next" />

                    <div className="carousel-slider carousel-slider--has-padding swiper-wrapper">
                      <div className="carousel-item hover-box swiper-slide">
                        <picture>
                          <img
                            src="https://via.placeholder.com/160x160"
                            alt="product name"
                            itemProp="image"
                          />
                        </picture>
                        <h3>Samsung 32 " Full HD UN32F5000 DF</h3>
                        <div className="itemBox--price">
                          <span className="value-item">$4.799</span>
                          <span className="value-note">
                            <del>$6324</del>
                            <span className="value-item--discount">
                              24% OFF
                            </span>
                          </span>
                        </div>
                        <a
                          href="/producto/af78e79d85"
                          className="btn_see_detail"
                        >
                          Ver detalle
                        </a>
                        <button className="gb-button primary small btn_add_product">
                          Agregar
                        </button>
                      </div>

                      <div className="carousel-item hover-box swiper-slide">
                        <picture>
                          <img
                            src="https://via.placeholder.com/160x160"
                            alt="product name"
                            itemProp="image"
                          />
                        </picture>
                        <h3>Samsung 32 " Full HD UN32F5000 DF</h3>
                        <div className="itemBox--price">
                          <span className="value-item">$4.799</span>
                          <span className="value-note">
                            <span
                              className="benefits ellipsis-text"
                              title="-$2.000 de bonificación"
                            >
                              -$2.000 de bonificación
                            </span>
                          </span>
                        </div>
                        <a
                          href="/producto/af78e79d85"
                          className="btn_see_detail"
                        >
                          Ver detalle
                        </a>
                        <button class="gb-button primary small btn_add_product">
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer>FOOTER NORMI</footer>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  
  state = { users: [] }

  componentDidMount() {
    fetch('/users')
    .then( res => res.json())
    .then( users => this.setState({ users}))
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.username}</li>  
          )}
        </ul>
      </div>
    );
  }
}

export default App;
*/
