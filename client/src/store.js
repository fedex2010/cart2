import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import config from "./config/config";

const logger = createLogger({
  collapsed: true,
  diff: true
});

export default function configureStore(initialState = {}) {

  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )

  window.onpopstate = function(event) {
    let pathName = new URLSearchParams( window.location.search ).get('pathName') || config.path_name.reactcart;

    store.dispatch({ type: "SET_PATHNAME", payload: {pathName},operationStatus: 'SUCCESSFUL' });
  };

  return  store
}
