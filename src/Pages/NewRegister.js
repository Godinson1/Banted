import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { validateRegistration } from "../validation";
import { RegisterUser } from "../actions/userActions";
import "./landing.css";

const NewRegister = ({ history }) => {
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
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="landing">
        <div className="first">
          <div className="slanted">
            <h1>Banted.</h1>
            <div className="base-desc">
              <p>
                Connect with other football lovers and experience banter like
                never before.
              </p>
            </div>
          </div>
        </div>
        <div className="second">
          <div>
            <h1>
              Join an amazing community of football lovers today and share
              banter.
            </h1>
          </div>
          <div className="authContainer">
            <h1>Register</h1>
            <div className="form">
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <label>Full Name</label>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name!",
                    },
                  ]}
                >
                  <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <div className="base-text">
                  <label>Username</label>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setHandle(e.target.value)} />
                  </Form.Item>
                </div>
                <div className="base-text">
                  <label>Email</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                  </Form.Item>
                </div>
                <div className="base-text">
                  <label>Password</label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <Form.Item {...tailLayout}>
                  <Button
                    disabled={
                      name === "" ||
                      password === "" ||
                      email === "" ||
                      handle === ""
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
              </Form>
              <div className="base-texts">
                Don't have an account? <Link to="/landing">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegister;
