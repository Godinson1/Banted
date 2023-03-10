import {
  LOADING_BANTERS,
  GET_ALL_BANTER,
  UNLIKE,
  LOADING_BANTER,
  LOADING,
  COMMENT_BANTER,
  DELETE_BANTER,
  GET_COMMENTS,
  LOADING_COMMENTS,
  LIKE,
  GET_BANTER,
} from "../actions/types";

const initialState = {
  loading: false,
  loading_banters: false,
  loading_banter: false,
  loading_comments: false,
  banters: [],
  comments: [],
  banter: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_BANTERS:
      return { loading_banters: true };
    case LOADING_BANTER:
      return { ...state, loading_banter: true };
    case LOADING_COMMENTS:
      return { ...state, loading_comments: true };
    case LOADING:
      return { ...state, loading: true };
    case COMMENT_BANTER:
      return {
        ...state,
        loading: false,
        banters: state.banters.map((banter) => (banter._id === action.payload.data._id ? action.payload.data : banter)),
        comments: state.comments.concat(action.payload.comment).reverse(),
      };
    case DELETE_BANTER:
      return {
        ...state,
        loading: false,
        banters: state.banters.filter((banter) => banter._id !== action.payload._id),
      };
    case UNLIKE:
    case LIKE:
      console.log("I am here for like...");
      return {
        ...state,
        loading: false,
        banters: state.banters.map((banter) => (banter._id === action.payload.data._id ? action.payload.data : banter)),
      };
    case GET_ALL_BANTER:
      return {
        loading_banters: false,
        loading_banter: false,
        banters: action.payload,
      };
    case GET_BANTER:
      return {
        ...state,
        loading: false,
        loading_banter: false,
        banter: action.payload,
        banters: state.banters.concat(action.payload).reverse(),
      };
    case GET_COMMENTS:
      return {
        ...state,
        loading_comments: false,
        comments: action.payload,
      };

    default:
      return state;
  }
}
