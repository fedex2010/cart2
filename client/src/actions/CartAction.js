import { SET_CURRENT_CART, SET_CAROUSEL ,SET_CURRENT_CART_ERROR,SET_SELECTED_PRODUCT} from "./Types";

function handleErrors(response) {
    if (!response.ok) {
        return response.json().then( json => {
            let err = new Error("algo salió mal")
            console.error(json)

            err.response = json

            console.error(err)
            
            throw err
        })
    }

    return Promise.resolve(response)
}

export const selectProduct = product => dispatch => {
    return dispatch({ type: SET_SELECTED_PRODUCT, payload: product });
};


export const fetchCart = id => dispatch => {
  fetch("api/cart/" + id)
    .then( handleErrors )
    .then(response => response.json())
    .then(response => {
        
        dispatch({ type: SET_CURRENT_CART, payload: response , xBrand:window.xBrand});

    }).catch( ( {response} ) =>{
        if( response.erro.cause.code == 404){
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code });
        }else{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
        }
    });
};

export const fetchNewCartByProduct = productId => dispatch => {
    fetch("api/cart/newCartByProductId/" + productId)
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
            
            dispatch({ type: SET_CURRENT_CART, payload: response , xBrand:window.xBrand});

        }).catch( ( {response} ) =>{
            if( response.erro.cause.code == 404){
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code });
            }else{
                dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
            }
        });
  };


export const getCarousel = (cartId) => dispatch => {
    
    fetch("api/cart/carousel")
        //.then( handleErrors )
        .then(response => response.json())
        .then(response => {  
            dispatch({ type: SET_CAROUSEL, payload: response });
        }).catch( ( {response} ) =>{            
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: response.erro.cause.code});
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
    .then( handleErrors )
    .then(response => response.json())
    .then(response => {
        dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL"  });
    }).catch( ( {response} ) =>{
        dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
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
    .then( handleErrors )
    .then(response => response.json())
    .then(response => {
        dispatch({ type: SET_CURRENT_CART, payload: response ,operationStatus: "SUCCESSFUL" });
    }).catch( ( {response} ) =>{
        dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
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
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch( ( {response} ) =>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
        });
};

export const deleteProduct = (productId) => dispatch => {
    dispatch({ type: SET_CURRENT_CART, operationStatus: "LOADING"});
    fetch("api/cart/" + productId,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
             dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: "SUCCESSFUL" });
        }).catch( ( {response} ) =>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult:500});
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
    .then( handleErrors )
    .then(response => response.json() )
    .then(response => {
        dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL', operationResult: 200});
    })
    .catch( ( {response} ) =>{

        if( response.erro.cause.code == 400){    
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 400});
        }else{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
        }
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
    .then( handleErrors )
    .then(response => response.json())
    .then(response => {
      dispatch({ type: SET_CURRENT_CART, payload: response, operationStatus: 'SUCCESSFUL' });
    })
    .catch(( {response} ) => {
        dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
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
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch( ( {response} ) =>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult:500});
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
        .then( handleErrors )
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CURRENT_CART, payload: response,operationStatus: 'SUCCESSFUL' });
        }).catch( ( {response} ) =>{
            dispatch({ type: SET_CURRENT_CART_ERROR, payload: response, operationStatus: 'ERROR', operationResult: 500});
        });
};
