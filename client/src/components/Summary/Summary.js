import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config/config";
import { Salesman, SubTotal, Iva, Warranties, TotalSummary, SpecialDiscount, CuponDiscount} from "./SummaryHelpers";
import CartAdditionals from "./CartAdditionals"
import { hideGereralLoading } from "../../actions/CartAction";


class Summary extends Component {
    
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.timeoutId = setTimeout(function () {
            this.setState({show: true});
        }.bind(this), 2000);
        
    
    this.props.hideGereralLoading()
}


  componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

  _continue(e){
//      window.location = "http://localhost:3000/compra/entrega";
        window.location = "/compra/entrega";
    }

  _moreProduct(){
      let homeUrl = ( window.xBrand === "garbarino" )?config.home_url.garbarino:config.home_url.compumundo;
      window.location = homeUrl;
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
    let isThereProductWithOutStock = this._isThereProductWithOutStock()

    let classLoading = this.props.operationStatus === "LOADING" ? "summary card--is-loading" : "summary"

    let classSummary = ""
    if(this.props.cart.products){
        classSummary = this._productCant(this.props.cart.products);
    }

    let cartAdditionals = null
    if(!isThereProductWithOutStock){
        cartAdditionals = <CartAdditionals cart={this.props.cart} />
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

                        { cartAdditionals }

                    </div>
                    <div className="cart-actions">
                        <button className="button--link" onClick={this._moreProduct.bind()}>
                            COMPRAR MÁS PRODUCTOS
                        </button>
                        <button type="button" className="button--primary" id="cart-buy-btn" disabled={isThereProductWithOutStock} onClick={this._continue.bind()}>
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


export default connect(mapStateToProps,{ hideGereralLoading })(Summary)
