import { SET_CURRENT_CART } from "../actions/type";

const initialState = {
  cart: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_CART:
      return {
        cart: action.cart
      };
    default:
      return state;
  }
};
