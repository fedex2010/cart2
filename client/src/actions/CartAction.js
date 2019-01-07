import { SET_CURRENT_CART, ADD_PRODUCT_CART, SET_CAROUSEL ,SET_CURRENT_CART_ERROR} from "./Types";

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
        dispatch({ type: SET_CURRENT_CART, payload: response });
    }).catch((err)=>{
      console.log("errr"+err)
    });
};

export const updateQuantityProduct = (cartId,product,quantity) => dispatch => {
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
            dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch((err)=>{
            console.log("errr"+err)
        });
};

export const editWarranty =(cartId,productId,warrantyId) => dispatch =>{
    let data={};
    data.cartId=cartId;
    data.product_id=productId;
    data.warranty_id=warrantyId;

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
    console.log("deleteProduct");
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
             dispatch({ type: SET_CURRENT_CART, payload: response });
        }).catch((err)=>{
            console.log("errr"+err)
        });
};

export const addCoupon = (couponId,cartId) => dispatch => {
    console.log("addCoupon");
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
    .catch((err)=>{
        dispatch({ type: SET_CURRENT_CART_ERROR, payload: err, operationStatus: 'ERROR', operationResult: err.cause.code,});
        console.log("errr::"+err)
    });
};

export const deleteCoupon = (couponId,cartId) => dispatch => {
    fetch("api/cart/c_"+cartId+"/cupon/"+couponId, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(response => {
        console.log("dispatch");
        dispatch({ type: SET_CURRENT_CART, payload: response });
    }).catch((err)=>{
        console.log("errr"+err)
    });
};
