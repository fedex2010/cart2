import { SET_CURRENT_CART, ADD_PRODUCT_CART, SET_CAROUSEL ,SET_CURRENT_CART_ERROR,SET_SELECTED_PRODUCT} from "./Types";

export const selectProduct = productId => dispatch => {
    return dispatch({ type: SET_SELECTED_PRODUCT, payload: productId });
};

export const fetchCart = id => dispatch => {
  fetch("/api/cart/" + id)
    .then(
            response => response.json()
        )
    .then(response => {
      return dispatch({ type: SET_CURRENT_CART, payload: response });
    }).catch((err)=>{
      console.log("errr"+err)
    });
};

export const getCarousel = (cartId) => dispatch => {
    fetch("api/cart/carousel")
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CAROUSEL, payload: response });
        }).catch((err)=>{
            console.log("errr"+err)
        });
};

export const addProduct = product => dispatch => {
  dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
  fetch("api/cart/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(response => {
        dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL"  });
    }).catch((err)=>{
      console.log("errr"+err)
    });
};

export const updateQuantityProduct = (cartId,product,quantity) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});

    let data={};
    data.xid=product;
    data.quantity=quantity;

    fetch("api/cart/"+cartId, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response ,operationStatus: "SUCCESSFUL" });
        }).catch((err)=>{
            console.log("errr"+err)
        });
};

export const editWarranty = (cartId, productId, warrantyId) => dispatch => {
  dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
  let data = {};
  data.cartId = cartId;
  data.product_id = productId;
  data.warranty_id = warrantyId;

    fetch("api/cart/setWarranty", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch((err)=>{
            console.log("errr"+err)
        });

};

export const deleteProduct = (productId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
    fetch("/api/cart/" + productId,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log("dispatch");
             dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch((response)=>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code,});
            console.log("errr"+response)
        });
};

export const addCoupon = (couponId,cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
    let data={};
    data.coupon_code = couponId;
    fetch("api/cart/"+cartId+"/cupon", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        if (typeof response.erro === "undefined") {
            dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL', operationResult: 200,});
        }else{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code,});
        }
    })
    .catch((response)=>{
        dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.cause.code});
        console.log("err:"+response)
    });
};

export const deleteCoupon = (couponId, cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
  fetch("api/cart/c_" + cartId + "/cupon/" + couponId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL' });
    })
    .catch(response => {
        dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code,});
    });
};

export const setLoyalties = (code,cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
    let data={};
    data.code=code;

    fetch("api/cart/c_" + cartId + "/aaPlus", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch((response)=>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code,});
        });
};

export const deleteLoyalties = (cartId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
    fetch("api/cart/c_" + cartId + "/aaPlus", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response,operationStatus: 'SUCCESSFUL' });
        }).catch((response)=>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code,});
        });
};
