import axios from "axios";
import { LIKED_BANTER, UNLIKED_BANTER, SET_BANTERS,
         SET_ERROR, LOADING_DATA, POST_BANTER 
       } from './types';

export const getBanters = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/banters')
        .then(res => {
            dispatch({
                type: SET_BANTERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_BANTERS,
                payload: []
            })
        })
}

export const postBanter = (banterData) => dispatch => {
    dispatch({ type: LOADING_DATA});
    console.log(banterData);
    axios.post('/banters/banter', banterData)
        .then(res => {
            dispatch({
                type: POST_BANTER,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
                payload: err.response
            })
        })
}

export const likeBanter = (banterId) => dispatch => {
    axios.get(`/banters/${banterId}/like`)
        .then(res => {
            dispatch({
                type: LIKED_BANTER,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
};

export const unlikeBanter = (banterId) => dispatch => {
    axios.get(`/banters/${banterId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKED_BANTER,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
};