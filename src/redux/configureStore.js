import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import user from "./user";
import image from "./image";
import search from "./search";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    image,
    search,
  });

const configureStore = (initialState) => {
  return createStore(
    createReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );
};

export default configureStore;
