import {SET_CAROUSEL, SET_CURRENT_CART, SET_CURRENT_CART_ERROR, SET_SELECTED_PRODUCT} from "../actions/Types";

const initialState = {
  cart: {},
  selectedProduct: {},
  carousel: {},
  err: {},
  redirectTo: "",
  operationStatus: "INITIAL",
  xBrand:""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_CART:
      return {
        ...state,
        cart: action.payload || state.cart,
        err: {},
        operationStatus:action.operationStatus
      };
      case SET_CURRENT_CART_ERROR:
        let url = ""

        if( action.operationResult > 404 ){
          url = "/carrito/error"
        }

        return {
            ...state,
            err: action.payload.erro,
            redirectTo: url,
            operationStatus:action.operationStatus
        };
      case SET_CAROUSEL:
        return{
            ...state,
            carousel: action.payload,
            operationStatus:action.operationStatus
        }
      case SET_SELECTED_PRODUCT:
        return{
            ...state,
            selectedProduct: action.payload,
            operationStatus:action.operationStatus
        }
    default:
      return state;
  }
};
