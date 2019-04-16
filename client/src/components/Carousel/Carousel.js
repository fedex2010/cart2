import React, { Component } from 'react';

import { connect } from "react-redux";
import {getCarousel, addProduct} from "../../actions/CartAction";
import {formatNumbers} from "../../utils/FormatNumbers";
import {formatImage} from "../../utils/FormatImage";
import config from "../../config/config";

import Swiper from 'react-id-swiper';

class Carousel extends Component {
    constructor(props) {
        super(props)
    }

    handleAddProduct(product,price){
        let  products = { xid: product, productPrice: price };
        this.props.addProduct(products);
        window.scrollTo(0, 0)
    }

    handleGetProduct(productId){
        window.location = "/producto/"+productId
    }

   componentDidMount(){
        this.props.getCarousel();
   }

    render() {
        const params = {
            slidesPerView: 'auto',
            slidesPerGroup: 4,
            spaceBetween: 0,
            simulateTouch: false,
            paginationClickable: true,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            renderPrevButton: () => <button className="gb-carousel-module-control gb--prev swiper-button-prev" gb-analytics="false" data-home-name="20190114_00a00_hogar-fest" data-component-type="vintage_carousel" data-element-title="prev" data-home-idx="3" data-element-position="" data-device="desktop"><span className="gb-icon-simple-bold-arrow-left"></span></button>,
            renderNextButton: () => <button className="gb-carousel-module-control gb--next swiper-button-next" gb-analytics="false" data-home-name="20190114_00a00_hogar-fest" data-component-type="vintage_carousel" data-element-title="next" data-home-idx="3" data-element-position="" data-device="desktop"><span className="gb-icon-simple-bold-arrow-right"></span></button>,
          };
          
          if (this.props.carousel.title !== undefined && typeof this.props.data !== "undefined") {
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
                                this.props.carousel.products.filter((it => productIds.indexOf(it.xid) === -1)).map((product, i) => (
                                    
                                    <div key={i} className="carousel-item hover-box swiper-slide carousel-item--with-actions">
                                        

                                        <div className="carousel-item-content">
                                            <picture>
                                                <img
                                                    src={formatImage(product.main_image.url)}
                                                    alt={product.description}
                                                    itemProp="image"
                                                    />
                                            </picture>
                                            <h3>{product.description}</h3>
                                            <div className="itemBox--price">
                                                <span className="value-item">${ formatNumbers(product.price.toString() )}</span>
                                                <span className="value-note">
                                                <del>${ formatNumbers(product.list_price.toString())}</del>
                                                <span className="value-item--discount">{product.discount}% OFF</span>
                                                </span>
                                            </div>
                                            </div>

                                            <div className="carousel-item-actions">
                                                <a href={'/producto/'+ product.xid} title={product.xid} itemProp="url" target="_blank" className="button--link button--xs">Ver detalle</a>
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
                <div></div>
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