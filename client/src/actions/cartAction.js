import { SET_CURRENT_CART } from "./Types";

export const fetchCart = id => dispatch => {
  fetch("/api/cart/" + id)
    .then(response => response.json())
    .then(response => {
      dispatch({ type: SET_CURRENT_CART, payload: response });
    });
};
