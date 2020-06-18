import { 
SET_BANTER, LIKED_BANTER, SET_BANTERS, 
UNLIKED_BANTER, LOADING_DATA, POST_BANTER } 
from '../actions/types'

const initialState = {
    banters: [],
    banter: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_BANTERS: 
            return {
                ...state,
                loading: false,
                banters: action.payload
            }
        case SET_BANTER:
            return {
                ...state,
                banter: action.payload
            }
        case LIKED_BANTER:
        case UNLIKED_BANTER:
            let index = state.banters.findIndex((banter) => banter._id === action.payload._id);
            state.banters[index] = action.payload;
            return {
                ...state
            }
        case POST_BANTER:
            return {
                ...state,
                banter: [action.payload, state.banters]
            }
        default:
            return state;
    }
}