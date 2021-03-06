import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import AuthRoute from './util/AuthRoute'
//Pages
import login from './Pages/login';
import register from './Pages/register';
import home from './Pages/home';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import { SET_AUTHENTICATED } from './actions/types';
import { logoutUser, getUserData } from './actions/userActions'
import { getBanters } from './actions/banterActions'

axios.defaults.baseURL = 'http://localhost:5000';

const token = localStorage.BToken;
if (token) {
  const decoded = JwtDecode(token);
  if(decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['banted-token'] = token;
    store.dispatch(getUserData());
    store.dispatch(getBanters());
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
        <Switch>
          <AuthRoute exact path='/' component={home} />
          <Route exact path='/login' component={login} />
          <Route exact path='/register' component={register} />
        </Switch>
        </div>
      </Router>
      </Provider>
  )
}

export default App;
