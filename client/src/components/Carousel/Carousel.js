import React, { Component } from 'react';

import { connect } from "react-redux";
import {getCarousel, addProduct} from "../../actions/CartAction";

import Swiper from 'react-id-swiper';

class Carousel extends Component {
    constructor(props) {
        super(props)
        this.props.getCarousel();
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
        const params = {
            slidesPerView: 'auto',
            slidesPerGroup: 4,
            spaceBetween: 0,
            simulateTouch: false,
            paginationClickable: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          };


          if (this.props.carousel.title != undefined && typeof this.props.data !== "undefined") { 
            const productIds = this.props.data.map((it => it.product_id));
            return (
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">
                            {this.props.carousel.title}
                        </h5>
                    </div>
                    <div className="swiper-container" id="carrousel-carrito">
                        <div className="carousel-slider carousel-slider--has-padding swiper-wrapper">
                        <Swiper {...params}>
                            {
                                this.props.carousel.products.filter((it => productIds.indexOf(it.xid) == -1)).map(product => (
                                    <div className="carousel-item hover-box swiper-slide carousel-item--with-actions">
                                        
                                        <div className="carousel-item-content">
                                            <picture>
                                                <img
                                                    src={product.main_image.url}
                                                    alt={product.description}
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
                                            </div>

                                            <div className="carousel-item-actions">
                                                <a onClick={this.handleGetProduct.bind(this)} className="button--link button--xs">Ver detalle</a>
                                                <button onClick={this.handleAddProduct.bind(this,product.xid,product.price)} className="button--primary button--xs">Agregar</button>
                                            </div> 
                                    </div>
                                    )
                                )
                            }      
                        </Swiper>   
                        </div>
                        
                    </div>
                </div>  
            );

          }else{
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


const mapStateToProps = state => {
    return { carousel: state.cartReducer.carousel, operationStatus: state.cartReducer.operationStatus };
};

export default connect(
    mapStateToProps,
    { getCarousel ,addProduct }
)(Carousel)