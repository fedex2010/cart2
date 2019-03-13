const RestConnector = require('./rest_connector');
const Rest_client = require('./rest_client');
let config  = require('../config/config'),
    logger  = require('../utils/logger'),
    Q = require("q");

const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;
const SEARCHLIST = config.searchList.url;

class ProductUpdater {
    constructor(_cartId, _product,brand){
        this.brand = brand
        this.cartId = _cartId
        this.product = _product
        this.productId = this.product.product_id
        this.apiClient = new Rest_client();
        this.data = {product_id: this.productId}
        this.execute = this.voidExecutor
    }

    withQuantity(_qty){
        if (_qty != this.product.quantity){
            this.data.quantity = _qty
            this.execute = this.putExecutor
        }
        return this
    }

    withWarranty(_warranty){
        if (_warranty && _warranty != this.product.warranty_id){
            this.data.warranty = _warranty
            this.execute = this.putExecutor
        }else{
            this.data.warranty = null
        }
        return this
    }

    withPromotion(_promotionId){
        if (_promotionId && (!this.product.promotion || this.product.promotion.id != _promotionId)){
            this.data.promotion = {id: _promotionId}
            this.execute = this.putExecutor
        }else{
            this.data.promotion = null
        }
        return this
    }

    putExecutor(){
        return this.apiClient.updateProductObj(this.cartId, this.productId, this.data,this.brand)
    }

    voidExecutor(){
        console.log("---------------------")
        return this.putExecutor()
    }
}
class ProductClient{
    getProductUpdater(cartId,product,brand){
        return new ProductUpdater(cartId, product,brand)
    }

    constructor() {
        this._restConnector = new RestConnector();
    }

    getProducts(xBrand, ...products) {
        let options={};
        options = {
            headers : {'X-Brand':xBrand}
        }
        var url = CHECKOUT_CORE_URL + "/products?ids=" + products.sort().join(",") + "&include=warranties,specifications";
        return this._restConnector.get(url, options);
    }

    

    addProduct(cartId, productId, quantity=1, warrantyId=undefined, productPrice=null, promotionId=undefined, session_id=null,brand){
        let url = `${CHECKOUT_CORE_URL}/carts/${cartId}/products`,
            data = {
                product_id: productId,
                quantity: quantity,
                warranty_id: warrantyId,
                price: productPrice
            }

        if (promotionId) {
            data.promotion = {id: promotionId}
        }
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'x-session-id': session_id,
                'X-Brand':brand
            },
            data: JSON.stringify(data)
        }

        return this._restConnector.post( url, options)
    }

    deleteProduct(cartId, productId,brand){

        console.log(brand);

        let url     = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId;

        let options = {
            headers: {
                'X-Brand':brand
            }
        }

        return this._restConnector.delete(url,options)
    }

    updateProduct(cartId, productId, quantity,brand) {
        let data = {
            product_id : productId,
            quantity : quantity
        }

        let url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId,
            options = {
                headers : {'Content-Type':'application/json'},
                'X-Brand':brand,
                data : JSON.stringify(data)
            }

        return this._restConnector.putWithOptions(url, options);
    };

    getProductsCarousel(brand) {

        let listName = config.searchList.list_name[brand];
        //let options = httpClient.getDefaultOptions(xBrand, config.services.searchList.timeout);
        let options={};
        options = {
            headers : {'X-Brand':brand}
        }
        let url = `${SEARCHLIST}/${listName}`;

        return this._restConnector.getWithOptions(url, options);
    }

    setWarranty(cartId, productId, warrantyId, brand) {
        var url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId,
            data = {
                warranty_id: warrantyId
            },
            options = {
                headers : {'Content-Type':'application/json','X-Brand':brand},
                data : JSON.stringify(data)
            };
        return this._restConnector.putWithOptions(url, options);
    }
}

module.exports = ProductClient;