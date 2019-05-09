import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true,
  diff: true
});

let middlewares = [thunk]

let enviroment = process.env.REACT_APP_APP_ENV || "dev"
if(enviroment !== "prod"){
  middlewares.push(logger)
}

export default function configureStore(initialState = {}) {

  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware( ...middlewares ))
  )
  return  store
}
