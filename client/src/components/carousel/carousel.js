import React, { Component } from 'react';
import { connect } from 'react-redux';


class Carousel extends Component {
 
  render() {
  return (
        <div className="card">
            <div className="card-title">
                <h5 className="card-title">¡Aprovechá y sumá al carrito estas ofertas!</h5>
            </div>
            <div className="carrusel swiper-container">
                <a className="swiper-button-prev gb-carousel-module-control gb--prev"></a>
                <a className="swiper-button-next gb-carousel-module-control gb--next"></a>
                
                <div className="carousel-slider carousel-slider--has-padding swiper-wrapper">
                
                <div className="carousel-item hover-box swiper-slide">
                    <picture>
                        <img src="https://via.placeholder.com/160x160" alt="product name"  itemProp="image"/>
                    </picture>
                    <h3>Samsung 32 " Full HD UN32F5000 DF</h3>
                    <div className="itemBox--price">
                        <span className="value-item">$4.799</span>
                        <span className="value-note">
                            <del>$6324</del>
                            <span className="value-item--discount">24% OFF</span>
                        </span>
                    </div>
                    <a href="/producto/af78e79d85" className="btn_see_detail">Ver detalle</a>
                    <button className="gb-button primary small btn_add_product">Agregar</button>
                </div>

                <div className="carousel-item hover-box swiper-slide">
                    <picture>
                        <img src="https://via.placeholder.com/160x160" alt="product name"  itemProp="image"/>
                    </picture>
                    <h3>Samsung 32 " Full HD UN32F5000 DF</h3>
                    <div className="itemBox--price">
                        <span className="value-item">$4.799</span>
                        <span className="value-note">
                            <span className="benefits ellipsis-text" title="-$2.000 de bonificación">-$2.000 de bonificación</span>
                        </span>
                    </div>
                    <a href="/producto/af78e79d85" className="btn_see_detail">Ver detalle</a>
                    <button class="gb-button primary small btn_add_product">Agregar</button>
                </div>

                
                </div>
            </div>
            

            </div>
  );
 }
}
export default Carousel;


