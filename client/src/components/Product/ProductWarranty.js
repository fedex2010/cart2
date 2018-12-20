import React, {Component} from "react"

class ProductWarranty extends Component{
    render(){
        return  (
            <div className="cart-item-warranties">
                <p>
                    <strong>¡Extendé tu protección</strong> y llevate{" "}
                    <span className="benefits">GRATIS</span> 60 días de cobertura
                    por robo y daños!
                </p>
                <ul className="cart-item-warranties--list">
                    <li>
                        <label>
                            <input type="checkbox" />
                            <a href="#">12 meses</a> de protección por{" "}
                            <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" />
                            <a href="#">24 meses</a> de protección por{" "}
                            <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" />
                            <a href="#">36 meses</a> de protección por{" "}
                            <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" />
                            <a href="#">48 meses</a> de protección por{" "}
                            <strong>$1.549</strong> ó 12 cuotas de <strong>$192</strong>
                        </label>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProductWarranty;