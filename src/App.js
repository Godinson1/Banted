import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import Navbar from './Components/Navbar';
import AuthRoute from './util/AuthRoute'
//Pages
import login from './Pages/login';
import register from './Pages/register';
import home from './Pages/home';
import welcome from './Pages/welcome';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import { SET_AUTHENTICATED } from './actions/types';
import { logoutUser, getUserData } from './actions/userActions'

axios.defaults.baseURL = 'http://localhost:4000';

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
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
        <Switch>
          <Route exact path='/' component={home} />
          <AuthRoute exact path='/login' component={login} />
          <AuthRoute exact path='/register' component={register} />
        </Switch>
        </div>
      </Router>
      </Provider>
  )
}

export default App;
