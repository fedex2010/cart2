import React, { Component } from "react";
import { connect } from "react-redux";
import {fetchCart, getCarousel, addProduct} from "../../actions/CartAction";

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.getCarousel();
    }

    handleAddProduct(product,price){
        var product = { xid: product, productPrice: price };
        console.log(product);
        this.props.addProduct(product);
    }

    handleGetProduct(e){
        //var product = e.target.value;
        //console.log(product);
        //window.location.href = '/producto/' + product;
        alert("ficha")
    }

    render() {
        console.log(this.props.carousel.title);
    if (this.props.carousel.title != undefined) {
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">
                        {this.props.carousel.title}
                    </h5>
                </div>
                <div className="carousel swiper-container">
                    <a className="swiper-button-prev gb-carousel-module-control gb--prev">
                        <span className="gb-icon-simple-bold-arrow-left" />
                    </a>
                    <a className="swiper-button-next gb-carousel-module-control gb--next">
                        <span className="gb-icon-simple-bold-arrow-right" />
                    </a>

                    <div className=" carousel-slider carousel-slider--has-padding swiper-wrapper">
                            {
                                this.props.carousel.products.map(product => (
                                    <div className="carousel-item hover-box swiper-slide">
                                        <picture>
                                            <img
                                                src="https://via.placeholder.com/160x160"
                                                alt="product name"
                                                itemProp="image"
                                            />
                                        </picture>
                                        <h3>{product.description}</h3>
                                        <div className="itemBox--price">
                                            <span className="value-item">${product.price}</span>
                                            <span className="value-note">
                                              <del>${product.list_price}</del>
                                              <span className="value-item--discount">{product.discount}% OFF</span>
                                            </span>
                                        </div>
                                        <a onClick={this.handleGetProduct.bind(this)} className="btn_see_detail">
                                            Ver detalle
                                        </a>
                                        <button className="button--primary button--xs" onClick={this.handleAddProduct.bind(this,product.xid,product.price)}>Agregar</button>
                                    </div>
                                    )
                                )
                            }

                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">

                    </h5>
                </div>
                <div className="carousel swiper-container">
                    <a className="swiper-button-prev gb-carousel-module-control gb--prev">
                        <span className="gb-icon-simple-bold-arrow-left" />
                    </a>
                    <a className="swiper-button-next gb-carousel-module-control gb--next">
                        <span className="gb-icon-simple-bold-arrow-right" />
                    </a>

                    <div className=" carousel-slider carousel-slider--has-padding swiper-wrapper">

                    </div>
                </div>
            </div>
        );
    }
  }
}

/*
        <div className="carousel-item hover-box swiper-slide">
              <picture>
                <img
                  src="https://via.placeholder.com/160x160"
                  alt="product name"
                  itemProp="image"
                />
              </picture>
              <h3>Samsung 32" Full HD UN32F5000 DF</h3>
              <div className="itemBox--price">
                <span className="value-item">$4.799</span>
                <span className="value-note">
                  <del>$6324</del>
                  <span className="value-item--discount">24% OFF</span>
                </span>
              </div>
              <a href="/producto/af78e79d85" className="btn_see_detail">
                Ver detalle
              </a>
              <button className="button--primary button--xs button__is-loading">
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
              <h3>Samsung 32" Full HD UN32F5000 DF</h3>
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
              <a href="/producto/af78e79d85" className="btn_see_detail">
                Ver detalle
              </a>
              <button className="button--primary button--xs">Agregar</button>
            </div>*/

const mapStateToProps = state => {
    console.log(state); // state
    return { carousel: state.cartReducer.carousel };
};

export default connect(
    mapStateToProps,
    { getCarousel ,addProduct }
)(Carousel)

