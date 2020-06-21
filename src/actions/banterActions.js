import { GET_ALL_BANTER, LOADING_BANTERS, SET_ERROR } from './types'
import axios from 'axios';

export const getBanters = () => async (dispatch) => {
    dispatch({ type: LOADING_BANTERS });
    try {
        const banters = await axios.get('/banters');
        dispatch({
            type: GET_ALL_BANTER,
            payload: banters.data
        });
        console.log(banters);
    }catch(err){
        dispatch({
            type: SET_ERROR,
            payload: err.response.data
        });
        console.log(err.response);
    }
   
}

