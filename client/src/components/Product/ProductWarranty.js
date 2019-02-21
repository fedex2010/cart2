import React, {Component} from "react"
import Cookie from "js-cookie";
import {editWarranty,selectProduct} from "../../actions/CartAction";
import {connect} from "react-redux";


class ProductWarranty extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idWarranty: ""  
        };
      }

    _optionsRender(productWarranty){
        let percentage = this.props.percentage;
        let li = []

        for (var i in productWarranty) {
            if (productWarranty.hasOwnProperty(i)) {
                if(typeof productWarranty[i].period === "string"){
                    productWarranty[i].period=productWarranty[i].period.split(' ')
                }
                let interest = (parseFloat(percentage) * parseFloat(productWarranty[i].price)) / 100;
                let installment_price = (productWarranty[i].price + interest) / 12;
                li.push({id:productWarranty[i].warranty_id,prod:productWarranty[i].period[0],price:productWarranty[i].price,installment_price:installment_price})
            }
        }

        li.sort(function (a, b) {
            if (a.prod > b.prod) {
                return 1;
            }
            if (a.prod < b.prod) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return (li);
    }

    _onSelectOption(id,product_id,event){
        let cartId = Cookie.get("cartId");
        if(!event.target.checked) id="DEFAULT_FACTORY";
        this.props.editWarranty(cartId,product_id,id);
    }

    _showModal(product,warranty_id,monthWarranty) {
        product.selectedWarranty_id = warranty_id;
        product.monthWarranty = monthWarranty;
        this.props.selectProduct(product);
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

    render(){
        if(typeof this.props.item !== "undefined" && this.props.percentage){
            let productsWarranty = this.props.item; 
            let product_id       = this.props.products;
            let classDelta       = this.props.classDelta;
            let checked;
            let liWarranty = this._optionsRender(productsWarranty);
            let empresarias = (Cookie.get("empresarias")==='true'?true:false);
            if(empresarias){
                return (<div></div>);
            }

            return  (
                <div className="cart-item-warranties">
                    <p>
                        <strong>¡Extendé tu protección</strong> y llevate{" "}
                        <span className="benefits">GRATIS</span> 60 días de cobertura
                        por robo y daños!
                        <span className={classDelta}>Precio Modificado</span>
                    </p>
                    <ul className="cart-item-warranties--list">
                        {
                            liWarranty.map((item, i)=>{
                                let garexId = "garex_"+item.prod+"_"+product_id;
                                checked = (this.props.warranty_id !== "DEFAULT_FACTORY" && this.props.warranty_id === item.id)?true:false;
                                return (<li key={i} ><label><input type="checkbox" value={item.id} checked={ checked } onChange={this._onSelectOption.bind(this,item.id,product_id)}  id={garexId}/><button className="link-to-button" data-toggle="modal"
                                data-target="#warranty-modal" onClick={this._showModal.bind(this, this.props.current, item.id,item.prod)} >{item.prod} meses</button> de protección por{" "}<strong>${ this._formatPrice(item.price)}</strong> ó 12 cuotas de <strong>${Math.ceil(item.installment_price)}</strong></label></li>)

                            })
                        }
                    </ul>

                </div>
            )
        }else{
            return (<div/>)
        }
    }
}


const mapStateToProps = state => {
    return { currentProduct: state.cartReducer.selectedProduct };
};

export default connect(
    mapStateToProps,
    { editWarranty,selectProduct }
)(ProductWarranty)