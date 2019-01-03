import React, { Component } from "react";
import { connect } from "react-redux";
import {getCarousel, addProduct} from "../../actions/CartAction";
import Cookie from "js-cookie";


import Swiper from "swiper";





class Carousel extends Component {

    constructor(props) {
        super(props)
        this.props.getCarousel();
      }

    

    componentWillMount() {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.2/js/swiper.js');
        document.body.appendChild(addScript);

       

        window.addEventListener("load", function() {
            window.loaded = true;
          });
    
          function logLoaded() {
            
            //initialize swiper when document ready
            var mySwiper = new Swiper(".swiper-container", {
              pagination: ".swiper-pagination",
              slidesPerView: "auto",
              slidesPerGroup: 4,
              spaceBetween: 0,
              simulateTouch: false,
              paginationClickable: true,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
              }
            });
          }
    
          (function listen() {
            if (window.loaded) {
              logLoaded();
            } else {
              console.log("notLoaded");
              window.setTimeout(listen, 50);
            }
          })();

    }


   

    componentDidMount(){
    
    }


    handleAddProduct(product,price){
        var product = { xid: product, productPrice: price };

        this.props.addProduct(product);
    }

    handleGetProduct(e){
        //var product = e.target.value;
        //console.log(product);
        //window.location.href = '/producto/' + product;
        alert("ficha")
    }

    render() {
    if (this.props.carousel.title != undefined) {
        const productIds = this.props.data.map((it => it.product_id));

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
                                this.props.carousel.products.filter((it => productIds.indexOf(it.xid) == -1)).map(product => (
                                    <div className="carousel-item hover-box swiper-slide carousel-item--with-actions">
                                        <div className="carousel-item-content">
                                        <picture>
                                            <img
                                                src={product.main_image.url}
                                                alt={product.description}
                                                itemProp="image"/>
                                        </picture>
                                        <h3>{product.description}</h3>
                                        <div className="itemBox--price">
                                            <span className="value-item">${product.price}</span>
                                            <span className="value-note">
                                              <del>${product.list_price}</del>
                                              <span className="value-item--discount">{product.discount}% OFF</span>
                                            </span>
                                        </div>
                                        </div>

                                            <div className="carousel-item-actions">
                                                <a onClick={this.handleGetProduct.bind(this)}  className="button--link button--xs">Ver detalle</a>
                                                <button className="button--primary button--xs" onClick={this.handleAddProduct.bind(this,product.xid,product.price)}>Agregar</button>
                                            </div>

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

