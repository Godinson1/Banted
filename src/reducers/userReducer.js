import { SET_USER, LOADING_UI, SET_AUTHENTICATED, SET_USERS,
         LIKE_BANTER, UNLIKE_BANTER, SET_UNAUTHENTICATED, SET_PROFILE, FOLLOW_USER, 
         UNFOLLOW_USER } from '../actions/types';

const initialState = {
    authenticated: false,
    loading_fol: false,
    likes: [],
    credentials: {},
    users: [],
    following: [],
    profile: {},
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
                ...state,
                authenticated: true,
                loading: false,
                credentials: action.payload,
                following: action.payload.following,
                likes: action.payload.likes
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case LOADING_UI: 
            return {
                ...state,
                loading_fol: true
            };
        case LIKE_BANTER:
            let index = state.profile.banters.findIndex((banter) => banter._id === action.payload.banterData._id)
            state.profile.banters[index] = action.payload.banterData
            return {
                ...state,
                likes: [
                    ...state.likes,
                    action.payload.like
                ]
            };
        case UNLIKE_BANTER:
            let i = state.profile.banters.findIndex((banter) => banter._id === action.payload.banterData._id)
            state.profile.banters[i] = action.payload.banterData
            return {
                ...state,
                likes: [state.likes.filter((like) => like.banterId !== action.payload.banterData._id)]
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case FOLLOW_USER:
            state.profile.userInformation[0] = action.payload.user
            state.profile.followers = action.payload.followers
            state.profile.following = action.payload.following
            return {
                ...state,
                loading_fol: false,
                following: [
                    ...state.following,
                    action.payload.isFollowed
                ]
            };
        case UNFOLLOW_USER:
            state.profile.userInformation[0] = action.payload.user
            state.profile.followers = action.payload.followers
            state.profile.following = action.payload.following
            return {
                ...state,
                loading_fol: false,
                following: [state.following.filter((follow) => follow._id !== action.payload.isFollowed._id)]
            };
        default:
            return state;
    }
}