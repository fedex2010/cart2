import React, { Component } from "react";
import { connect } from "react-redux";
import { Salesman, SubTotal, Iva, Warranties, TotalSummary, SpecialDiscount, CuponDiscount, CartAdditionals} from "./SummaryHelpers";


class Summary extends Component {
    
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.timeoutId = setTimeout(function () {
            this.setState({show: true});
        }.bind(this), 2000);
    }

  componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

  _continue(e){
      window.location = "/compra/entrega";
  }

  _formatPrice(value, decimals) {
    if(value == undefined){
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

  componentWillReceiveProps(nextProps){
    this.setState({input: nextProps.cupon});
  }

  _isThereProductWithOutStock(){
    let disabled = false

    if(this.props.cart.products !== undefined){
        let { products } = this.props.cart;

        try{
            for (let i = 0; i < products.length; i++) {
                if(!products[i].validations.saleable){
                    disabled = true
                    break
                }    
            }            
        }catch(err){
            console.error(err)
            disabled = false
        }

    }
    return disabled
  }


 
    _isPromotion(cart){
        let hasPolcom = cart.products.filter(function(p){ return p.polcom }).length > 0;
        let hasPriceMatchingDiscount = cart.products.filter(function(p) { return p.price_matching_discount > 0}).length > 0;
        let hasCrosseling = cart.products.filter(function(p){return p.promotion && p.promotion.status === 'VALID' && p.promotion.total_discount > 0;}).length > 0;

        return (hasPriceMatchingDiscount || hasPolcom || hasCrosseling);
    }

    _productCant(products){
        let count = products.length;
        let classSummary = (count >=3 )?"purchase-summary--fixed":"";
        return classSummary;
    }
    

  render() {
    //used for "Continue" button
    let disabled = this._isThereProductWithOutStock()

    let classLoading = this.props.cart.operationStatus === "LOADING" ? "summary card--is-loading" : "summary"

    let classSummary = ""
    if(this.props.cart.products){
        classSummary = this._productCant(this.props.cart.products);
    }

    return (
        <div className={classSummary}>
            <div className={classLoading}>
                <div className="purchase-summary">
                    <div className="card cart-summary">
                        <div className="cart-summary-header">
                            <span className="cart-summary-title">Resumen de compra</span>
                        </div>
                        
                        <Salesman />

                        <ul className="summary-detail">

                            <SubTotal cart={this.props.cart}/>

                            <Iva cart={this.props.cart}/>
                            <Warranties cart={this.props.cart}/>

                            <CuponDiscount cart={this.props.cart} />
                            <SpecialDiscount cart={this.props.cart} />

                            <TotalSummary cart={this.props.cart} />

                        </ul>

                        <CartAdditionals cart={this.props.cart} />

                    </div>
                    <div className="cart-actions">
                        <button className="button--link">
                            COMPRAR MÁS PRODUCTOS
                        </button>
                        <button type="button" className="button--primary" disabled={disabled} onClick={this._continue.bind()}>
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
    return { 
            operationStatus: state.cartReducer.operationStatus, 
            cart: state.cartReducer.cart 
        };
};

export default connect(mapStateToProps,{})(Summary)
