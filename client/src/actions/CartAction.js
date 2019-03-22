import { SET_CURRENT_CART, SET_CAROUSEL, SET_CURRENT_CART_ERROR, SET_SELECTED_PRODUCT, SET_PATHNAME } from "./Types";
import config from "../config/config";

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

export const selectProduct = product => dispatch => {
    return dispatch({ type: SET_SELECTED_PRODUCT, payload: product });
};

export const justReload = id => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });

    fetch("/carrito/api/cart/" + id, { credentials: 'include' })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, xBrand: window.xBrand });

        }).catch((err) => {

            console.error("*************")
            console.error(err)
            console.error("*************")

            if (err.response.erro.cause.code == 404) {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: err.response.erro.cause.code });
            } else {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
            }
        });
};


export const fetchCart = id => dispatch => {
    fetch("/carrito/api/cart/" + id, { credentials: 'include' })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, xBrand: window.xBrand });

        }).catch((err) => {

            console.error("*************")
            console.error(err)
            console.error("*************")

            if (err.response.erro.cause.code == 404) {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: err.response.erro.cause.code });
            } else {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
            }
        });
};

export const fetchNewCartByProduct = (productId, couponId) => dispatch => {
    let url = "/carrito/api/cart/newCartByProductId/" + productId

    if (couponId != "") {
        url += "/" + couponId
    } else {
        url += "/UNDEFINED"
    }

    fetch(url, { credentials: 'include' })
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
            //just to remove params from url
            window.history.pushState( {}, "", "/carrito" );

            dispatch({ type: SET_CURRENT_CART, payload: response, xBrand: window.xBrand });

        }).catch((err) => {
            if (err.response.erro.cause.code == 404) {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: err.response.erro.cause.code });
            } else {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
            }
        });
};


export const getCarousel = (cartId) => dispatch => {

    fetch("/carrito/api/cart/carousel", { credentials: 'include' })
        //.then( handleErrors )
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CAROUSEL, payload: response });
        }).catch((err) => {
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: err.response.erro.cause.code });
        });
};

export const addProduct = product => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart", {
        method: "POST",
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch((err) => {
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
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
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
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
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
        });
};

export const deleteProduct = (productId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart/" + productId,
        {
            method: "DELETE",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch((err) => {
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
        });
};

export const addCoupon = (couponId, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    let data = {};
    data.coupon_code = couponId;

    fetch("/carrito/api/cart/" + cartId + "/cupon", {
        method: "POST",
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
            console.log("-----addCoupon----")
            console.log(response)

            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL', operationResult: 200 });
        })
        .catch((err) => {

            if (err.response.erro.cause.code == 400) {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 400 });
            } else {
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
            }
        });
};

export const deleteCoupon = (couponId, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart/c_" + cartId + "/cupon/" + couponId, {
        method: "DELETE",
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
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
        });
};

export const setLoyalties = (code, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    let data = {};
    data.code = code;

    fetch("/carrito/api/cart/c_" + cartId + "/aaPlus", {
        method: "POST",
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
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
        });
};

export const deleteLoyalties = (cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING" });
    fetch("/carrito/api/cart/c_" + cartId + "/aaPlus", {
        method: "DELETE",
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
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: err.response, operationStatus: 'ERROR', operationResult: 500 });
        });
};


export const updatePathName = (url, pathName) => dispatch => {
    window.history.pushState({}, "", url);

    dispatch({ type: SET_PATHNAME, payload: { pathName }, operationStatus: 'SUCCESSFUL' });
};
