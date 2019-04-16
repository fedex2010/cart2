import {HIDE_GENERAL_LOADING,SET_CAROUSEL, SET_CURRENT_CART, SET_CURRENT_CART_ERROR, SET_SELECTED_PRODUCT} from "../actions/Types";

const initialState = {
  cart: {},
  selectedProduct: {},
  carousel: {},
  err: {},
  operationStatus: "INITIAL",
  xBrand:"",
  showGeneralLoading:true
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case HIDE_GENERAL_LOADING:
      return {
        ...state,
        showGeneralLoading:false
      };
    case SET_CURRENT_CART:
      return {
        ...state,
        cart: action.payload || state.cart,
        err: {},
        operationStatus:action.operationStatus
      };
    case SET_CURRENT_CART_ERROR:
      return {
          ...state,
          err: action.payload.erro,
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
