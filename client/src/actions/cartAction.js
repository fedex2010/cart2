import { SET_CURRENT_CART } from "./types";

export function setCurrentCart(cart) {
  return {
    type: SET_CURRENT_CART,
    cart
  };
}
export function setCart(data) {
  return dispatch => {
    return fetch.post("/api/cart/5bbe3e53e4b093b426db56b2", data).then(res => {
      dispatch(setCurrentCart(data));
    });
  };
}
