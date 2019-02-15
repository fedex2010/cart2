import {SET_CAROUSEL, SET_CURRENT_CART, SET_CURRENT_CART_ERROR, SET_SELECTED_PRODUCT,SET_PATHNAME} from "../actions/Types";

import config from "../config/config";

const initialState = {
  cart: {},
  selectedProduct: {},
  carousel: {},
  err: {},
  pathName: config.path_name.reactcart,
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

      let pathName = ( action.operationResult > 404 )? config.path_name.error : config.path_name.reactcart ;
      return {
          ...state,
          err: action.payload.erro,
          pathName: pathName,
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
    
    case SET_PATHNAME:
      return{
          ...state,
          pathName: action.payload.pathName
      }
    default:
      //VER COMO FORZAR AL PRINCIPIO EL DISPATCH DE SET_PATHNAME
      const params = new URLSearchParams( window.location.search );
      state.pathName = params.get('pathName') || config.path_name.reactcart;

      return state;
  }
};
