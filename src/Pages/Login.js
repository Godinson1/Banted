import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateLogin } from "../validation";
import { LoginUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import { Divider, Alert } from "antd";
import Input from "../Components/Utils/Input";
import Button from "../Components/Utils/Button";
import "../Pages/styles/main/main.scss";

const Login = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const logUserIn = (e) => {
    e.preventDefault();
    const { valid, error } = validateLogin({ data, password });
    if (!valid) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      const user = {
        data,
        password,
      };
      dispatch(LoginUser(user, history, setErrorMessage));
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  }, [errorMessage]);
  return (
    <div>
      <div className="auth">
        <div className="header-login">
          <h1 className="secondary-color">Banted.</h1>
          <div>
            <p>Login to Share the Banted Experience...</p>
          </div>
        </div>

        <div className="two">
          <div className="auth-container">
            <div className="auth">
              {errorMessage && (
                <Alert
                  style={{ fontFamily: "Roboto" }}
                  message={errorMessage}
                  type="error"
                />
              )}
            </div>
            <Input
              type="text"
              label="Email/Handle"
              placeholder="Enter email address or handle."
              value={data}
              onChange={(e) => setData(e.target.value)}
              onkeyDown={logUserIn}
            />
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter password."
              show={showPassword}
              setShowPassword={setShowPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link id="link" to="/logins">
              <div className="auth">
                <p className="small-text">Forgot Password?</p>
              </div>
            </Link>
            <Button
              label={state && state.loading_log ? "Loading..." : "Login"}
              disabled={
                data === "" || password === ""
                  ? true
                  : state && state.loading_log
                  ? true
                  : false
              }
              onClick={logUserIn}
            />
            <Divider />
            <div className="flex">
              <p className="small-text">
                Don't have an Account?{" "}
                <Link id="link" to="/register">
                  REGISTER
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
