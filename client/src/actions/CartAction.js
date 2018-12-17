import { SET_CURRENT_CART, ADD_PRODUCT_CART ,SET_CAROUSEL } from "./Types";

export const fetchCart = id => dispatch => {
  fetch("/api/cart/" + id)
    .then(response => response.json())
    .then(response => {
      dispatch({ type: SET_CURRENT_CART, payload: response });
    });
};

export const addProduct = product => dispatch => {
  fetch("api/cart/", {
  	method: "POST",
  	headers: {
  		Accept: "application/json",
  		"Content-Type" : "application/json"
  	},
  	body: JSON.stringify(product)
  })
  .then(response => response.json())
  .then(response => {
    dispatch({ type: SET_CURRENT_CART, payload: response });
  });
};

export const getCarousel = () => dispatch => {
    fetch("api/cart/carousel")
        .then(response => response.json())
        .then(response => {
            dispatch({ type: SET_CAROUSEL, payload: response });
        });
};
