import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import "./styles/landing/landing.scss";
import Input from "../Components/Utils/Input";
import Button from "../Components/Utils/Button";
import { validateRegistration } from "../validation";
import { RegisterUser } from "../actions/userActions";

export default function RegisterScreen({ setShowModal, history }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  }, [errorMessage]);

  const onBoardUser = (e) => {
    e.preventDefault();
    const { valid, error } = validateRegistration({
      name,
      handle,
      email,
      password,
    });
    if (!valid) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      const user = {
        name,
        handle,
        email,
        password,
      };
      dispatch(RegisterUser(user, history, setErrorMessage));
    }
  };

  return (
    <div>
      <div className="register">
        <div className="register-auth-container">
          <div className="flex-between">
            <div></div>
            <div>
              <CloseOutlined id="icon" onClick={() => setShowModal(false)} />
            </div>
          </div>
          <p className="medium-text-secondary">Register</p>
          <div>
            {errorMessage && (
              <Alert
                message={
                  errorMessage ||
                  (state.errors && state.errors.error && state.errors.error)
                }
                type="error"
                style={{ fontFamily: "Roboto" }}
              />
            )}
          </div>
          <Input
            type="text"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name."
          />
          <Input
            type="text"
            label="Handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter handle."
          />
          <Input
            type="text"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address."
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
          <Button
            label={state && state.loading_reg_log ? "Loading..." : "Register"}
            disabled={
              name === "" || password === "" || email === "" || handle === ""
                ? true
                : state && state.loading_reg_log
                ? true
                : false
            }
            onClick={onBoardUser}
          />
          <Divider />
          <div className="flex">
            <p className="small-text">
              Already have an Account?{" "}
              <Link id="link" to="/logins">
                <span onClick={() => setShowModal(false)}>LOGIN</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}