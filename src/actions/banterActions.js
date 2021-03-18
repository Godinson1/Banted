import {
  GET_ALL_BANTER,
  LOADING_BANTERS,
  SET_ERROR,
  LIKE_BANTER,
  UNLIKE_BANTER,
} from "./types";
import axios from "axios";

export const getBanters = () => async (dispatch) => {
  dispatch({ type: LOADING_BANTERS });
  try {
    const banters = await axios.get("/banters");
    dispatch({
      type: GET_ALL_BANTER,
      payload: banters.data,
    });
    console.log(banters);
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response,
    });
    console.log(err.response);
  }
};

export const likeBanter = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/banters/${id}/like`);
    console.log(res.data);
    dispatch({ type: LIKE_BANTER, payload: res.data });
  } catch (err) {
    console.log(err.response);
  }
};

export const unlikeBanter = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/banters/${id}/unlike`);
    dispatch({ type: UNLIKE_BANTER, payload: res.data });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
