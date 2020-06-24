import { CLEAR_ERROR, SET_ERROR, LOADING_REG_LOG } from '../actions/types'

const initialState = {
    loading: false,
    loading_reg_log: false,
    errors: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_REG_LOG:
            return {
                loading_reg_log: true
            }
        case SET_ERROR:
            return {
                ...state,
                loading_reg_log: false,
                errors: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                errors: null
            }
        default:
            return state;
    }
}