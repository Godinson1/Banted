import React, { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import store from "./store";
import { AuthRoute, ViewportProvider } from "./util/";
//Pages

import { Modals, Compose } from "./Components/Utils";
import Preloader from "./Components/Preloader";
//Config
import JwtDecode from "jwt-decode";
import axios from "axios";
import { SET_AUTHENTICATED } from "./actions/types";
import { logoutUser, getUserData, getUsers } from "./actions/userActions";
import { getBanters } from "./actions/banterActions";
import Landing from "./Pages/Landing";
import NewRegister from "./Pages/NewRegister";
import Main from "./Components/Main/index";
import ViewBanter from "./Components/ViewBanter/index";
import Profile from "./Components/Profile";

const NotFound = lazy(() => import("./Pages/NotFound"));

//axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://banted.herokuapp.com";

const token = localStorage.BToken;
if (token) {
  const decoded = JwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["banted-token"] = token;
    store.dispatch(getUserData());
    store.dispatch(getBanters());
    store.dispatch(getUsers());
  }
}

const App = () => {
  const location = useLocation();
  const background = location && location.state && location.state.background;

  return (
    <div className="container">
      <ViewportProvider>
        <Suspense fallback={<Preloader />}>
          <Switch location={background || location}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Landing} />
            <Route exact path="/register" component={NewRegister} />
            <AuthRoute path="/home" component={Main} />
            <AuthRoute path="/explore" component={Main} />
            <AuthRoute path="/notifications" component={Main} />
            <Route exact path="/:id/status/:id" component={ViewBanter} />
            <AuthRoute exact path="/main" component={Main} />
            <AuthRoute path="/message" component={Main} />
            <AuthRoute path="/bookmark" component={Main} />
            <AuthRoute path="/:id" component={Profile} />
            <AuthRoute path="/lists" component={Main} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </ViewportProvider>
      {background && (
        <div>
          <Route path="/:id/status/:id/photo/:id" children={<Modals />} />
          <Route path="/compose/banter" children={<Compose />} />
        </div>
      )}
    </div>
  );
};

export default App;
