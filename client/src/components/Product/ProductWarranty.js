import React, {Component} from "react"
import Cookie from "js-cookie";
import {editWarranty} from "../../actions/CartAction";
import {connect} from "react-redux";


class ProductWarranty extends Component{

    _optionsRender(productWarranty){
        let percentage = this.props.percentage;
        let li = []
        for (var i in productWarranty) {
            if (productWarranty.hasOwnProperty(i)) {
                productWarranty[i].period=productWarranty[i].period.split(" ")
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



    render(){
        if(typeof this.props.item !== "undefined"){
            let productsWarranty = this.props.item;
            let product_id       = this.props.products;
            let checked;
            let liWarranty = this._optionsRender(productsWarranty);

            return  (
                <div className="cart-item-warranties">
                    <p>
                        <strong>¡Extendé tu protección</strong> y llevate{" "}
                        <span className="benefits">GRATIS</span> 60 días de cobertura
                        por robo y daños!
                    </p>
                    <ul className="cart-item-warranties--list">
                        {
                            liWarranty.map((item)=>{
                                checked = (this.props.warranty_id !== "DEFAULT_FACTORY" && this.props.warranty_id === item.id)?true:false;
                                return (<li><label><input type="checkbox" value={item.id} checked={ checked } onClick={this._onSelectOption.bind(this,item.id,product_id)} /><a href="#">{item.prod} meses</a> de protección por{" "}<strong>${item.price}</strong> ó 12 cuotas de <strong>${Math.ceil(item.installment_price)}</strong></label></li>)
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
    return { product: state.cartReducer.product };
};

export default connect(
    mapStateToProps,
    { editWarranty }
)(ProductWarranty)