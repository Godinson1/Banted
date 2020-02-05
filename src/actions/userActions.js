import { SET_USER, SET_ERROR, LOADING_UI, CLEAR_ERROR } from '../actions/types';
import axios from 'axios';


export const LoginUser = (user, history) => (dispatch) => {

    dispatch({type: LOADING_UI});
    axios.post('http://localhost:4000/users/login', user)
        .then(res => {
            console.log(res.data);
            const BToken = res.data.token;
            localStorage.setItem('BToken', BToken);
            axios.defaults.headers.common['banted-token'] = BToken;
            dispatch(getUserData());
            history.push('/');
        })
        .catch(err => {
            console.log(err);
        })
}

export const getUserData = () => (dispatch) => {
    axios.get('http://localhost:4000/users/user')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}
    
  
