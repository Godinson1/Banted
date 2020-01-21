import { CLEAR_ERROR, SET_ERROR, LOADING_UI } from '../actions/types'

const initialState = {
    loading: false,
    errors: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}