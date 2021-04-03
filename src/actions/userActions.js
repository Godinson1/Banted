import {
  SET_USER,
  SET_ERROR,
  LOADING_UI,
  UNFOLLOW_USER,
  CLEAR_ERROR,
  SET_UNAUTHENTICATED,
  FOLLOW_USER,
  LOADING_REG,
  LOADING_LOG,
  SET_PROFILE,
  SET_USERS,
} from "../actions/types";
import axios from "axios";
import { getBanters } from "./banterActions";

export const LoginUser = (user, history, setErrorMessage) => (dispatch) => {
  dispatch({ type: LOADING_LOG });
  axios
    .post(`users/login`, user)
    .then((res) => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch(getBanters());
      dispatch({ type: CLEAR_ERROR });
      history.push("/home");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.error);
        dispatch({
          type: SET_ERROR,
          payload: err.response.data,
        });
      }
    });
};

export const RegisterUser = (newData, history, setErrorMessage) => (
  dispatch
) => {
  dispatch({ type: LOADING_REG });
  axios
    .post("/users/register", newData)
    .then((res) => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch(getBanters());
      dispatch({ type: CLEAR_ERROR });
      history.push("/home");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.error);
        dispatch({
          type: SET_ERROR,
          payload: err.response.data,
        });
      }
    });
};

export const getUserData = () => (dispatch) => {
  axios
    .get("/users/")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getUser = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/${handle}`);
    dispatch({
      type: SET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const getUsers = () => (dispatch) => {
  axios
    .get("/users/users")
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//Follow User
export const followUser = (handle) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/users/follow/${handle}`);
    dispatch({
      type: FOLLOW_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

//Unfollow User
export const unFollowUser = (handle) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/users/unfollow/${handle}`);
    dispatch({
      type: UNFOLLOW_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOADING_LOG });
  localStorage.removeItem("BToken");
  //delete axios.defaults.common.headers["banted-token"];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = "/";
};

const setAuthorization = (token) => {
  const BToken = token;
  localStorage.setItem("BToken", BToken);
  axios.defaults.headers.common["banted-token"] = BToken;
};
