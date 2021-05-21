import {
  SET_USER,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_USERS,
  LIKE,
  UNLIKE,
  SET_UNAUTHENTICATED,
  SET_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  LOADING_PROFILE,
} from "../actions/types";

const initialState = {
  authenticated: false,
  loading_fol: false,
  loading_profile: false,
  likes: [],
  credentials: {},
  users: [],
  following: [],
  profile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
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
        likes: action.payload.likes,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LOADING_UI:
      return {
        ...state,
        loading_fol: true,
      };
    case LOADING_PROFILE:
      return {
        ...state,
        loading_profile: true,
      };
    case LIKE:
      return {
        ...state,
        likes: state.likes.concat(action.payload.like),
      };
    case UNLIKE:
      return {
        ...state,
        likes: [
          state.likes.filter(
            (like) => like.banterId !== action.payload.data._id
          ),
        ],
      };
    case SET_PROFILE:
      return {
        ...state,
        loading_profile: false,
        profile: action.payload,
      };
    case FOLLOW_USER:
      state.profile.userInformation[0] = action.payload.user;
      state.profile.followers = action.payload.followers;
      state.profile.following = action.payload.following;
      return {
        ...state,
        loading_fol: false,
        following: [...state.following, action.payload.isFollowed],
      };
    case UNFOLLOW_USER:
      state.profile.userInformation[0] = action.payload.user;
      state.profile.followers = action.payload.followers;
      state.profile.following = action.payload.following;
      return {
        ...state,
        loading_fol: false,
        following: [
          state.following.filter(
            (follow) => follow._id !== action.payload.isFollowed._id
          ),
        ],
      };
    default:
      return state;
  }
}
