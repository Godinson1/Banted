import React from 'react'
import { Route, Redirect } from 'react-router-dom';


 const AuthRoute = ({component: Component, ...rest}) => {
    return <Route
     {...rest}
     render = {(props) => !localStorage.getItem('BToken') ? <Redirect to='/login'/> : <Component {...props} />}
     />
 };

export default AuthRoute;
