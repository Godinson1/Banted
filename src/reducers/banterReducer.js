import {
  LOADING_BANTERS,
  GET_ALL_BANTER,
  UNLIKE,
  LOADING_BANTER,
  LOADING,
  DELETE_BANTER,
  LIKE,
  GET_BANTER,
} from "../actions/types";

const initialState = {
  loading: false,
  loading_banters: false,
  loading_banter: false,
  banters: [],
  banter: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_BANTERS:
      return {
        loading_banters: true,
      };
    case LOADING_BANTER:
      return {
        ...state,
        loading_banter: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BANTER:
      return {
        ...state,
        loading: false,
        banters: state.banters.filter(
          (banter) => banter._id !== action.payload._id
        ),
      };
    case UNLIKE:
    case LIKE:
      return {
        ...state,
        loading: false,
        banters: state.banters.map((banter) =>
          banter._id === action.payload.data._id ? action.payload.data : banter
        ),
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
        loading_banter: false,
        banter: action.payload,
        banters: state.banters.concat(action.payload).reverse(),
      };

    default:
      return state;
  }
}
