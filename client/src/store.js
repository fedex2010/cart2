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
  let store;
  if (process.env.REACT_APP_APP_ENV != "prod") {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk, logger))
    );
  } else {
    store = createStore(rootReducer);
  }
  return store;
}
