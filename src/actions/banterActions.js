import {
  GET_ALL_BANTER,
  LOADING_BANTERS,
  SET_ERROR,
  UNLIKE,
  GET_BANTER,
  LOADING_BANTER,
  LOADING,
  LIKE,
  DELETE_BANTER,
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

export const postBanter = (data, setImages, emptyText) => async (dispatch) => {
  dispatch({ type: LOADING_BANTER });
  try {
    const banters = await axios.post("/banters/banter", data);
    console.log(banters.data.data);
    if (banters) {
      dispatch({ type: GET_BANTER, payload: banters.data.data });
      setImages([]);
      emptyText();
    }
  } catch (err) {
    if (err && err.response && err.response.data) {
      dispatch({
        type: SET_ERROR,
        payload: err.response,
      });
    }
  }
};

export const likeBanter = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const res = await axios.get(`/banters/${id}/like`);
    console.log(res.data.data);
    dispatch({ type: LIKE, payload: res.data.data });
  } catch (err) {
    if (err) console.log(err.response);
  }
};

export const unlikeBanter = (id) => async (dispatch) => {
  console.log("clicked unlike");
  dispatch({ type: LOADING });
  try {
    const res = await axios.get(`/banters/${id}/unlike`);
    console.log(res.data.data);
    dispatch({ type: UNLIKE, payload: res.data.data });
  } catch (err) {
    if (err) console.log(err);
  }
};

export const deleteBanter = (id, setShow) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const res = await axios.delete(`/banters/${id}`);
    dispatch({ type: DELETE_BANTER, payload: res.data.data });
    setShow(false);
  } catch (err) {
    if (err) console.log(err);
  }
};
