import {SET_CAROUSEL, SET_CURRENT_CART} from "../actions/Types";

const initialState = {
  cart: {},
  carousel:{}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_CART:
      return {
        ...state,
        cart: action.payload,
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
