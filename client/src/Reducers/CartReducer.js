import {SET_CAROUSEL, SET_CURRENT_CART,SET_CURRENT_CART_ERROR} from "../actions/Types";

const initialState = {
  cart: {},
  selectedProduct: {},
  carousel: {},
  err: {},
  operationStatus: "INITIAL"
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_CART:
      return {
        ...state,
        cart: action.payload || state.cart,
        operationStatus:action.operationStatus
      };
      case SET_CURRENT_CART_ERROR:
          return {
              ...state,
              err: action.payload,
          };
      case SET_CAROUSEL:
        return{
            ...state,
            carousel: action.payload
        }
    default:
      return state;
  }
};
