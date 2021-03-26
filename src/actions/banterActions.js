import {
  GET_ALL_BANTER,
  LOADING_BANTERS,
  SET_ERROR,
  LIKE_BANTER,
  UNLIKE_BANTER,
  GET_BANTER,
  LOADING_BANTER,
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
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response,
    });
  }
};

export const postBanter = (data) => async (dispatch) => {
  dispatch({ type: LOADING_BANTER });
  try {
    const banters = await axios.post("/banters/banter", data);
    console.log(banters.data);
    dispatch({
      type: GET_BANTER,
      payload: banters.data,
    });
    //window.location.reload();
  } catch (err) {
    if (err && err.response && err.response.data) {
      console.log(err.response.data);
      dispatch({
        type: SET_ERROR,
        payload: err.response,
      });
    }
  }
};

export const likeBanter = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/banters/${id}/like`);
    dispatch({ type: LIKE_BANTER, payload: res.data });
  } catch (err) {
    console.log(err.response);
  }
};

export const unlikeBanter = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/banters/${id}/unlike`);
    dispatch({ type: UNLIKE_BANTER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
