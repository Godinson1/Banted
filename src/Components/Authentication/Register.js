import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { validateRegistration } from "../../validation";
import { RegisterUser } from "../../actions/userActions";
import { REGISTER_FORM, Layout } from "./index";

import "./auth.scss";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(errorMessage);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    console.log(e.target);
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "handle") setHandle(e.target.value);
  };

  const onBoardUser = (e) => {
    e.preventDefault();
    const { valid, error } = validateRegistration({
      name,
      handle,
      email,
      password,
    });
    if (!valid) {
      message.error(error);
    } else {
      setErrorMessage("");
      const user = {
        name,
        handle,
        email,
        password,
      };
      dispatch(RegisterUser(user, history, message.error));
    }
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 100,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 100,
    },
  };

  return (
    <div>
      <Layout page="Register">
        {REGISTER_FORM.map(({ name, className, label, placeholder }, index) => (
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <div className={className} key={index}>
              <label>{label}</label>
              <Form.Item name={name}>
                {name === "password" ? (
                  <Input.Password
                    name={name}
                    placeholder={placeholder}
                    onChange={(e) => handleOnChange(e)}
                  />
                ) : (
                  <Input
                    name={name}
                    placeholder={placeholder}
                    onChange={(e) => handleOnChange(e)}
                  />
                )}
              </Form.Item>
            </div>
          </Form>
        ))}
        <Form.Item {...tailLayout}>
          <Button
            disabled={
              name === "" || password === "" || email === "" || handle === ""
                ? true
                : state && state.loading_reg
                ? true
                : false
            }
            onClick={onBoardUser}
            type="primary"
            size="large"
          >
            {state && state.loading_reg ? "Loading..." : "Register"}
          </Button>
        </Form.Item>
      </Layout>
    </div>
  );
};

export default Register;
