import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true,
  diff: true
});

export default function configureStore(initialState = {}) {

  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
  return  store
}
