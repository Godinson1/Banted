import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import AuthRoute from "./util/AuthRoute";
//Pages
import { Profile, LoginScreen, NewHome, HomePage, NotFound } from "./Pages";
import AlternativeMedia from "./Media/AlternativeMedia";

//Config
import JwtDecode from "jwt-decode";
import axios from "axios";
import { SET_AUTHENTICATED } from "./actions/types";
import { logoutUser, getUserData, getUsers } from "./actions/userActions";
import { getBanters } from "./actions/banterActions";

axios.defaults.baseURL = "http://localhost:5000";

const token = localStorage.BToken;
if (token) {
  const decoded = JwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["banted-token"] = token;
    store.dispatch(getUserData());
    store.dispatch(getBanters());
    store.dispatch(getUsers());
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route path="/profile" component={Profile} />
            <Route path="/media" component={AlternativeMedia} />
            <Route path="/new" component={NewHome} />
            <Route path="/home" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
