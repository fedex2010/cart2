import { SET_CURRENT_CART, ADD_PRODUCT_CART, SET_CAROUSEL } from "./Types";

export const fetchCart = id => dispatch => {
  fetch("/api/cart/" + id)
    .then(
            response => response.json()
        )
    .then(response => {
      //const cookies = new Cookies();
      //cookies.set("cartId", response.cart_id, { path: "/" });
      return dispatch({ type: SET_CURRENT_CART, payload: response });
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
    });
};

export const getCarousel = (cartId) => dispatch => {
  fetch("api/cart/" + cartId + "/carousel")
    .then(response => response.json())
    .then(response => {
      dispatch({ type: SET_CAROUSEL, payload: response });
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
             dispatch({ type: SET_CURRENT_CART, payload: response });
        });
};
