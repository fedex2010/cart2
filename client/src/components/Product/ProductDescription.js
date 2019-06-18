import React, { Component } from "react";
import ProductWarranty from "./ProductWarranty";
import {  updateQuantityProduct,  deleteProduct,  selectProduct} from "../../actions/CartAction";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import {formatImage} from "../../utils/FormatImage";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdModal: {},
      operationStatus:"SUCCESSFUL",
      fromGarex:props.fromGarex
    };
  }

  _onSortChange(product_id, e) {
    let cartId = Cookie.get("cartId");
    let quantity = e.target.value;
    this.props.updateQuantityProduct(cartId, product_id, quantity);
  }

  _showStatus(saleable) {
    let clasStatus = "cart-item-tag cart-item-tag--error";
    let clasStatusNone = "cart-item-tag cart-item-tag--error displaynone";

    return !saleable ? clasStatus : clasStatusNone;
  }


  _showModal(product) {
    this.props.selectProduct(product);
  }

  _formatPrice(value, decimals) {
    if(value === undefined){
        return 0;
    }
      /**
       * Number.prototype.format(n, x, s, c)
       *
       * @param integer n: length of decimal
       * @param integer x: length of whole part
       * @param mixed   s: sections delimiter
       * @param mixed   c: decimal delimiter
       */
      if(!decimals){
          decimals = 0;
      }

      var n = decimals,
          x = 3,
          s = ".",
          c = ",";

      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = value.toFixed(Math.max(0, ~~n));

    
      num = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
      return num.replace(",00", "")
  }

  _getGarexDescription(){
    let period = this.props.item.coverage_period.split(" ")[0];
    let related = this.props.item.related

    let description = <span>
                        <p>{"Garantía de reparación"} <b>{  "por " + period + " meses" }</b></p>
                        <p>{"Para " + related.description}</p>
                      </span>

    return description
  }

  _getDefaultDescription(){
    let product = this.props.item

    return <a href={'/producto/'+ product.product_id} title={product.product_id} itemProp="url" target="_blank" rel="noopener noreferrer">{product.description}</a>
  }

  render() {
    let product = this.props.item;
    let percentage = this.props.percentage;
    let showStatus = this._showStatus(product.validations.saleable);
    let displaynone = ( product.validations.saleable ) ?"":"displaynone";

    let showChangePrice = (product.price_delta) ? "cart-item-tag cart-item-tag--info":"cart-item-tag cart-item-tag--info displaynone";
    let warranty_delta_class  = (product.delta_warranty_price) ? "cart-item-tag cart-item-tag--info":"cart-item-tag cart-item-tag--info displaynone";
    let isDisabled = this.props.operationStatus === "LOADING" || this.state.fromGarex? true : false;
    let idProduct  = "productId_"+product.product_id;
    let empresarias = (Cookie.get("empresarias")===true?true:false);
    let idQuantity = "idQuantity_"+product.product_id;

    let priceRound = this._formatPrice(product.price);
    let subtotalPriceRound = this._formatPrice(product.subtotal_price);

    let productWarranty
    let imageProduct = (navigator.userAgent.indexOf("Chrome") !== -1) ? product.main_image.url : formatImage(product.main_image.url);

    if( !this.state.fromGarex && typeof product.warranties != "undefined" && product.warranties.constructor === Object && Object.keys(product.warranties).length > 0 ){
      productWarranty = <ProductWarranty
                            current={product}
                            item={product.warranties}
                            products={product.product_id}
                            warranty_id={product.warranty_id}
                            percentage={percentage}
                            classDelta={warranty_delta_class}
                          />
    }

    let aDescription = (this.state.fromGarex)? this._getGarexDescription() :this._getDefaultDescription();

    return (
      <div className={ showStatus === "cart-item-tag cart-item-tag--error" ? "cart-item card cart-item-sold-out": "cart-item card"}  id={idProduct}>
        <div className="cart-item-detail"  itemScope itemType="http://schema.org/Offer" >
          <div className="cart-item-column">
            <picture className="cart-item-image">
              <img src={imageProduct} alt="product name" itemProp="image"/>
            </picture>
          </div>
          <div className="cart-item-column cart-item-column-lg">
            <h3 className="cart-item-name">
                { aDescription }
            </h3>
            <span className={showStatus}>Agotado</span>
            <span className={showChangePrice}>Precio Modificado</span>
          </div>
          
            <div className={`${empresarias ? 'cart-item-column column-empresarias' : 'cart-item-column'}  ${displaynone} `}>
              <label>Precio:</label>
              <span className="cart-item-column-data precio-texto">${priceRound} {`${empresarias ? '+ IVA' : ''}`}</span>
            </div>

            <div className={`${'cart-item-column'}  ${displaynone} `}>
              <label>Cantidad:</label>
              <select
                className="form-control form-control--sm"
                value={product.quantity}
                onChange={this._onSortChange.bind(this, product.product_id)}
                disabled={isDisabled}
                id={idQuantity}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className={`${empresarias ? 'cart-item-column column-empresarias' : 'cart-item-column'} ${displaynone}`}>
              <label>Subtotal:</label>
              <strong className="cart-item-column-data precio-texto">
                ${subtotalPriceRound} {`${empresarias ? '+ IVA' : ''}`}
              </strong>
            </div>

          <button
            onClick={this._showModal.bind(this, product)}
            className="has-tooltip gui-icon-trash icon--md"
            data-toggle="modal"
            data-target="#delete-product"
          >
            <span className="tooltip_bottomCenter">Eliminar</span>
          </button>
        </div>
        
        {productWarranty}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { product: state.cartReducer.product, operationStatus: state.cartReducer.operationStatus,xBrand: state.cartReducer.xBrand };
};

export default connect(
  mapStateToProps,
  { updateQuantityProduct, deleteProduct, selectProduct }
)(ProductDescription);
