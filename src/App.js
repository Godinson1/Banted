import React, { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import store from "./store";
import { AuthRoute, ViewportProvider } from "./util/";
//Pages
import { Login, Register } from "./Components/Authentication";
import ComposeBanter from "./Components/Navs/Left/compose/ComposeBanter";
import { Modals } from "./Components/Utils";
import Preloader from "./Components/Preloader";
//Config
import axios from "axios";
import Main from "./Components/Main/index";
import ViewBanter from "./Components/ViewBanter/index";
import Profile from "./Components/Profile";
import { checkUserAuthentication } from "./util/helpers";

const NotFound = lazy(() => import("./Pages/NotFound"));

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "https://banted-api.onrender.com";

checkUserAuthentication(store);

const App = () => {
  const location = useLocation();
  const background = location && location.state && location.state.background;

  return (
    <div className='container'>
      <ViewportProvider>
        <Suspense fallback={<Preloader />}>
          <Switch location={background || location}>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <AuthRoute path='/home' component={Main} />
            <AuthRoute path='/explore' component={Main} />
            <AuthRoute path='/notifications' component={Main} />
            <AuthRoute exact path='/:id/status/:id' component={ViewBanter} />
            <AuthRoute exact path='/main' component={Main} />
            <AuthRoute path='/message' component={Main} />
            <AuthRoute path='/bookmark' component={Main} />
            <AuthRoute path='/:id' component={Profile} />
            <AuthRoute path='/lists' component={Main} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </ViewportProvider>
      {background && (
        <div>
          <Route path='/:id/status/:id/photo/:id' children={<Modals />} />
          <Route path='/compose/banter' children={<ComposeBanter />} />
        </div>
      )}
    </div>
  );
};

export default App;
