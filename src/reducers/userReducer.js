import { SET_USER, LOADING_UI, SET_AUTHENTICATED,
         SET_UNAUTHENTICATED, LIKE_BANTER, LOADING_REG_LOG,
         UNLIKE_BANTER } from '../actions/types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: []
}

export default function(state = initialState, action){
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
        return {
            authenticated: true,
            loading: false,
            credentials: action.payload
        };
        case LOADING_UI: 
            return {
                ...state,
                loading: true
            };
        case LIKE_BANTER:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.likes.userHandle,
                        banterId: action.payload.banterId
                    }
                ]
            };
        case UNLIKE_BANTER:
            return {
                ...state,
                likes: state.likes.filter((like) => like.banterId !== action.payload.banterId)
            };
        default:
            return state;
    }
}