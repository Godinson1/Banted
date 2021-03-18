import {
  CLEAR_ERROR,
  SET_ERROR,
  LOADING_LOG,
  LOADING_REG,
} from "../actions/types";

const initialState = {
  loading: false,
  loading_log: false,
  loading_reg: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_LOG:
      return {
        loading_log: true,
      };
    case LOADING_REG:
      return {
        loading_reg: true,
      };
    case SET_ERROR:
      return {
        ...state,
        loading_log: false,
        loading_reg: false,
        errors: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
}
