import React, { Suspense, lazy, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import store from "./store";
import { AuthRoute, ViewportProvider } from "./util/";
//Pages
import { LoginScreen, NotFound, Banter, Login, RegisterScreen } from "./Pages";
import { Modals, Compose } from "./Components/Utils";
import Preloader from "./Components/Preloader";
//Config
import JwtDecode from "jwt-decode";
import axios from "axios";
import { SET_AUTHENTICATED } from "./actions/types";
import { logoutUser, getUserData, getUsers } from "./actions/userActions";
import { getBanters } from "./actions/banterActions";

const HomePage = lazy(() => import("./Pages/HomePage"));

axios.defaults.baseURL = "http://localhost:5000";
//axios.defaults.baseURL = "https://banted.herokuapp.com";

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

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.background &&
      location.state.background.pathname !== "/home"
    ) {
      //location.state.background.pathname = "/home";
    }
  }, [location]);

  return (
    <div className="container">
      <ViewportProvider>
        <Suspense fallback={<Preloader />}>
          <Switch location={background || location}>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={RegisterScreen} />
            <AuthRoute path="/home" component={HomePage} />
            <AuthRoute path="/explore" component={HomePage} />
            <AuthRoute path="/notifications" component={HomePage} />
            <AuthRoute path="/profile" component={HomePage} />
            <AuthRoute path="/messages" component={HomePage} />
            <AuthRoute path="/bookmarks" component={Preloader} />
            <AuthRoute path="/lists" component={HomePage} />
            <Route exact path="/modal/:id" component={Modals} />
            <Route exact path="/:id/status/:id" component={Banter} />
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
