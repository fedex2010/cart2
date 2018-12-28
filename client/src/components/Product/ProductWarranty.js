import React, {Component} from "react"

class ProductWarranty extends Component{

    _optionsRender(productWarranty){
        let li = []
            for (var i in productWarranty) {
            if (productWarranty.hasOwnProperty(i)) {
                console.log( i + " = " + productWarranty[i] + "\n");
                li.push("<li>"+productWarranty[i].period+"</li>")
            }
        }
        console.log(li);
    }

    render(){
        let productsWarranty = this.props.item;
        let liWarranty = this._optionsRender(productsWarranty)
        return  (
            <div className="cart-item-warranties">
                <p>
                    <strong>¡Extendé tu protección</strong> y llevate{" "}
                    <span className="benefits">GRATIS</span> 60 días de cobertura
                    por robo y daños!
                </p>
                <ul className="cart-item-warranties--list">

                </ul>
            </div>
        )
    }
}

export default ProductWarranty;