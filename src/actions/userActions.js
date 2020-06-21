import { SET_USER, SET_ERROR, LOADING_UI,
         CLEAR_ERROR, SET_UNAUTHENTICATED,
         LOADING_REG_LOG  
       } from '../actions/types';
import axios from 'axios';
import { getBanters } from './banterActions'


export const LoginUser = (user, history) => (dispatch) => {

    dispatch({type: LOADING_UI});
    axios.post('/users/login', user)
        .then(res => {
            console.log(res.data);
            setAuthorization(res.data.token);
            dispatch(getUserData());
            dispatch(getBanters());
            dispatch({type: CLEAR_ERROR});
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data
            })
            console.log(err.response.data);
        })
}

export const RegisterUser = (newData, history) => (dispatch) => {

    dispatch({type: LOADING_REG_LOG});
    axios.post('/users/register', newData)
        .then(res => {
            console.log(res.data);
            setAuthorization(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERROR});
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data
            })
            console.log(err);
        })
}


export const getUserData = () => (dispatch) => {
    axios.get('/users/')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const logoutUser = () => dispatch => {
    dispatch({type: LOADING_REG_LOG});
    localStorage.removeItem('BToken');
    //delete axios.defaults.common.headers['banted-token']
    dispatch ({type: SET_UNAUTHENTICATED});
    window.location.href = '/login'
}
    
const setAuthorization = (token) => {
    const BToken = token;
    localStorage.setItem('BToken', BToken);
    axios.defaults.headers.common['banted-token'] = BToken;
}
