import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { validateLogin } from "../../validation";
import { LoginUser } from "../../actions/userActions";
import { LOGIN_FORM, Layout } from "./index";

import "./auth.scss";

const Login = ({ history }) => {
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    if (e.target.name === "data") setData(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  const logUserIn = (e) => {
    e.preventDefault();
    const { valid, error } = validateLogin({ data, password });
    if (!valid) {
      message.error(error, 5);
    } else {
      const user = { data, password };
      dispatch(LoginUser(user, history, message.error));
    }
  };
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 100 } };
  const tailLayout = { wrapperCol: { offset: 0, span: 100 } };

  return (
    <div>
      <Layout page='Login'>
        {LOGIN_FORM.map(({ name, className, label, placeholder }, index) => (
          <Form {...layout} name='basic' key={index}>
            <div className={className} key={index}>
              <label>{label}</label>
              <Form.Item name={name}>
                {name === "password" ? (
                  <Input.Password name={name} placeholder={placeholder} onChange={(e) => handleOnChange(e)} />
                ) : (
                  <Input name={name} placeholder={placeholder} onChange={(e) => handleOnChange(e)} />
                )}
              </Form.Item>
            </div>
          </Form>
        ))}
        <Form.Item {...tailLayout}>
          <Button
            disabled={password === "" || data === "" ? true : state && state.loading_log ? true : false}
            onClick={logUserIn}
            type='primary'
            size='large'
          >
            {state && state.loading_log ? "Loading..." : "Login"}
          </Button>
        </Form.Item>
      </Layout>
    </div>
  );
};

export default Login;
