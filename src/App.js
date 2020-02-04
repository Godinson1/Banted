import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import Navbar from './Components/Navbar';
//Pages
import login from './Pages/login';
import register from './Pages/register';
import home from './Pages/home';
import welcome from './Pages/welcome';
import test from './Pages/test';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
        <Switch>
          <Route exact path='/' component={welcome} />
          <Route exact path='/login' component={login} />
          <Route exact path='/register' component={register} />
          <Route exact path='/home' component={home} />
          <Route exact path='/test' component={test} />
        </Switch>
        </div>
      </Router>
      </Provider>
  )
}

export default App;
