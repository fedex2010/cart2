import { SET_CURRENT_CART, ADD_PRODUCT_CART, SET_CAROUSEL } from "./Types";

export const fetchCart = id => dispatch => {
    console.log("fetchhh");
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
            dispatch({ type: SET_CURRENT_CART, payload: response });
        })
        .catch((err)=>{
            console.log("errr"+err)
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
        dispatch({ type: SET_CURRENT_CART, payload: response });
    }).catch((err)=>{
        this.fetchCart(cartId);
        console.log("errr"+err)
    });
};
