import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const auth = useSelector(state => state.users)

 const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
     {...rest}
     render = {(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props} />}
     />
 );

export default AuthRoute;
