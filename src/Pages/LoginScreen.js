import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Particles from "react-particles-js";
import { Link } from "react-router-dom";
import { Divider, Alert } from "antd";

import "./styles/landing/landing.scss";
import Footer from "../Components/Footer";
import Input from "../Components/Utils/Input";
import Button from "../Components/Utils/Button";
import RegisterScreen from "./RegisterScreen";

import { validateLogin } from "../validation";
import { LoginUser } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      <div className="overlay-container">
        <div className="landing-container">
          <Particles />
          <div className="after">
            <div className="flex">
              {showModal && (
                <div id="show-modal">
                  <RegisterScreen
                    setShowModal={setShowModal}
                    history={history}
                  />
                </div>
              )}

              <div className="one">
                <div>
                  <h1 className="large-text">Banted.</h1>
                </div>
                <div>
                  <p className="medium-text">
                    Connect with other football lovers and experience banter
                    like never before.
                  </p>
                </div>
              </div>
              <div className="two">
                <div className="auth-container">
                  <div>
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
                    <p className="small-text">Forgot Password?</p>
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
                  <div className="flex" onClick={() => setShowModal(true)}>
                    <p className="small-text">
                      Don't have an Account?{" "}
                      <Link id="link" to="/">
                        REGISTER
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginScreen;
