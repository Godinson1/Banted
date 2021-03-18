import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import banterReducer from "./banterReducer";
import authReducer from "./authReducer";

export default combineReducers({
  users: userReducer,
  errors: errorReducer,
  banters: banterReducer,
  auth: authReducer,
});
