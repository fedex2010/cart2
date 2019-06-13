import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config/config";
import { Salesman, SubTotal, Iva, Warranties, TotalSummary, SpecialDiscount, CuponDiscount} from "./SummaryHelpers";
import CartAdditionals from "./CartAdditionals"
import { hideGereralLoading } from "../../actions/CartAction";


class Summary extends Component {
      constructor(props) {
        super(props);
        
        this.state = {
            classLoadingContinue: true,

            timeoutLoading: false
        };

        console.log(props.fromGarex)
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
    this.setState({classLoadingContinue: false});   
    window.location = "/compra/entrega";  
 
   }

  _moreProduct(){
      let homeUrl = ( window.xBrand === "garbarino" )?config.home_url.garbarino : ( window.xBrand === "compumundo" ) ? config.home_url.compumundo: config.home_url.empresarias;
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
    let isGarex = this.props.cart.isGarex
    let isThereProductWithOutStock = this._isThereProductWithOutStock()
    //

    
    let classLoading = this.props.operationStatus === "LOADING" ? "summary card--is-loading" : "summary"

    let classSummary = "";
    if(this.props.cart.products){
        classSummary = this._productCant(this.props.cart.products);
    }

    let cartAdditionals = null
    let buyMore = <button className="button--link" onClick={this._moreProduct.bind()}>COMPRAR MÁS PRODUCTOS</button>
    let iva = <Iva cart={this.props.cart}/>
    let warranties = <Warranties cart={this.props.cart}/>
    let cuponDiscount = <CuponDiscount cart={this.props.cart} />
    let specialDiscount = <SpecialDiscount cart={this.props.cart} />

    if(!isThereProductWithOutStock && !isGarex){
        cartAdditionals = <CartAdditionals cart={this.props.cart} />
    }

    if( isGarex ){
        buyMore = null
        iva = null
        warranties = null
        cuponDiscount = null
        specialDiscount = null
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

                            {iva}
                            {warranties}

                            {cuponDiscount}
                            {specialDiscount}
                            
                            <TotalSummary cart={this.props.cart} />

                        </ul>

                        { cartAdditionals }

                    </div>
                    <div className="cart-actions">
                        { buyMore }

                        <button type="button" className={this.state.classLoadingContinue ? 'button--primary' : 'button--primary button--is-loading' } id="cart-buy-btn" disabled={isThereProductWithOutStock} onClick={this._continue.bind(this)}>
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
