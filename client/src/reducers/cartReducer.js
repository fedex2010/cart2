import { SET_CURRENT_CART } from "../actions/types";

const initialState = {
  cart: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_CART:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};
