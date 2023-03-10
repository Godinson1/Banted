import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "@fontsource/roboto";
import store from "./store";
import "./sass/_global.scss";
import "./index.css";
import AppProvider from "./util/appConfig";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </Provider>,
  document.getElementById("root")
);
