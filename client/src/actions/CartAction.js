import { HIDE_GENERAL_LOADING,SET_CURRENT_CART, SET_CAROUSEL, SET_CURRENT_CART_ERROR, SET_SELECTED_PRODUCT,ONLY_RE_RENDER} from "./Types";
import history from '../history';

function handleErrors(response) {
    if (!response.ok) {
        return response.json().then(json => {
            let err = new Error("algo salió mal")

            console.error("*************")
            console.error(json)
            console.error("*************")

            err.response = json

            throw err
        })
    }
    return Promise.resolve(response)
}


function getErrorObject(err){
    if(err.response){
        return err
    }else{
        console.warn("forcing error structure, error ocurred in react context")
        return {
                response: {
                    erro:{
                        cause : {
                            code : 500,
                            message : JSON.stringify(err)
                            }
                        }
                    }
                }
    }
}

function getErroCode(err){
    try{
        return err.response.erro.cause.code
    }catch(errr){
        console.warn("err exception has no server response estructure")
        console.warn(errr)
        return 500
    }
}


export const selectProduct = product => dispatch => {
    return dispatch({ type: SET_SELECTED_PRODUCT, payload: product });
};

export const hideGereralLoading = product => dispatch => {
    return dispatch({ type: HIDE_GENERAL_LOADING, payload: {} });
};


export const justReload = id => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });

    fetch("/carrito/api/cart/" + id, { credentials: 'include', cache: "no-store", 'Cache-Control': 'no-cache'})
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, xBrand: window.xBrand });

        }).catch((err) => {
            let errObject = getErrorObject(err)

            let errorCode = getErroCode(err)
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });

            history.push('/carrito/error')
        });
};


export const fetchCart = id => dispatch => {
    fetch("/carrito/api/cart/" + id, { credentials: 'include', cache: "no-store", 'Cache-Control': 'no-cache' })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, xBrand: window.xBrand });

        }).catch((err) => {
            let errObject = getErrorObject(err)

            let errorCode = getErroCode(err)
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });

            history.push('/carrito/error')
        });
};

export const fetchNewCart = (productId = "", couponId = "") => dispatch => {
    let url = "/carrito/api/cart/newCart"

    if (productId !== "") {
        url += "/" + productId
    } else {
        url += "/UNDEFINED"
    }

    if (couponId !== "") {
        url += "/" + couponId
    } else {
        url += "/UNDEFINED"
    }

    fetch(url, { credentials: 'include', cache: "no-store" , 'Cache-Control': 'no-cache'})
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
            //just to remove params from url
            history.push('/carrito')
            dispatch({ type: SET_CURRENT_CART, payload: response, xBrand: window.xBrand });

        }).catch((err) => {
            let errObject = getErrorObject(err)

            let errorCode = getErroCode(err)
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });

            history.push('/carrito/error')
        });
};

export const getCarousel = (cartId) => dispatch => {
    fetch("/carrito/api/cart/carousel", { credentials: 'include'})
        //.then( handleErrors )
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CAROUSEL, payload: response, operationStatus: "SUCCESSFUL" });
            
        }).catch((err) => {
            let errorCode = getErroCode(err)
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });
            history.push('/carrito/error')
        });
};

export const addProduct = product => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart", {
        method: "POST",
        credentials: 'include',
        cache: "no-store",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {

            window.gb.normandia.getCartItems();

            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch((err) => {
            let errorCode = getErroCode(err)
            let errObject = getErrorObject(err)

            if ( errorCode === 403) {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });
            } else {
                history.push('/carrito/error')
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
            }

        });
};

export const updateQuantityProduct = (cartId, product, quantity) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });

    let data = {};
    data.xid = product;
    data.quantity = quantity;

    fetch("/carrito/api/cart/" + cartId, {
        method: "PUT",
        credentials: 'include',
        cache: "no-store",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch((err) => {
            let errorCode = getErroCode(err)
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });
            history.push('/carrito/error')
        });
};

export const editWarranty = (cartId, productId, warrantyId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    let data = {};
    data.cartId = cartId;
    data.product_id = productId;
    data.warranty_id = warrantyId;

    fetch("/carrito/api/cart/setWarranty", {
        method: "POST",
        credentials: 'include',
        cache: "no-store",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch((err) => {
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
            history.push('/carrito/error')
        });
};

export const deleteProduct = (productId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart/" + productId,
        {
            method: "DELETE",
            credentials: 'include',
            cache: "no-store",
        
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            window.gb.normandia.getCartItems();

            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch((err) => {
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
            history.push('/carrito/error')
        });
};

export const addCoupon = (couponId, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    let data = {};
    data.coupon_code = couponId;

    fetch("/carrito/api/cart/" + cartId + "/cupon", {
        method: "POST",
        credentials: 'include',
        cache: "no-store",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL', operationResult: 200 });
        })
        .catch((err) => {
            let errorCode = getErroCode(err)
            let errObject = getErrorObject(err)

            if (errorCode === 400 || errorCode === 405) {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });
            } else {
                history.push('/carrito/error')
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: errorCode });
            }
        });
};

export const deleteCoupon = (couponId, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart/c_" + cartId + "/cupon/" + couponId, {
        method: "DELETE",
        cache: "no-store",
        
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            console.log("-----deleteCoupon----")
            console.log(response)

            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL' });
        })
        .catch((err) => {
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
            history.push('/carrito/error')
        });
};

export const setLoyalties = (code, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    let data = {};
    data.code = code;

    fetch("/carrito/api/cart/c_" + cartId + "/aaPlus", {
        method: "POST",
        cache: "no-store",
        
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch((err) => {
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
            history.push('/carrito/error')
        });
};

export const deleteLoyalties = (cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart/c_" + cartId + "/aaPlus", {
        method: "DELETE",
        cache: "no-store",
        
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL' });
        }).catch((err) => {
            let errObject = getErrorObject(err)

            dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
            history.push('/carrito/error')
        });
};

export const setLoginMessageClosedCookie = (cartId) => dispatch =>  {
    fetch("/carrito/api/cart/setLoginMessageClosedCookie", {
        method: "POST",
        cache: "no-store",
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CP":"Potato"
        }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        dispatch({ type: ONLY_RE_RENDER, payload: {}, operationStatus: 'SUCCESSFUL' });
    }).catch((err) => {
        console.error(err)
        let errObject = getErrorObject(err)

        dispatch({ type: SET_CURRENT_CART_ERROR, payload: errObject.response, operationStatus: 'ERROR', operationResult: 500 });
        history.push('/carrito/error')
    });
}