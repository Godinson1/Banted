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

let authenticated;
const token = localStorage.BToken;
if (token) {
  const decoded = JwtDecode(token);
  if(decoded.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
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
          <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
          <AuthRoute exact path='/register' component={register} authenticated={authenticated}/>
        </Switch>
        </div>
      </Router>
      </Provider>
  )
}

export default App;
