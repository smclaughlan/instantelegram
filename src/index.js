import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import configureStore, { history } from "./redux/configureStore";

const preloadedState = {
  user: {
    token: localStorage.getItem("x-access-token"),
    currentUserId: localStorage.getItem("currentUserId"),
    isEditingProfile: false,
  },
};

const store = configureStore(preloadedState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
