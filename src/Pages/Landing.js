import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateLogin } from "../validation";
import { LoginUser } from "../actions/userActions";
import "./landing.css";

const Landing = ({ history }) => {
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const logUserIn = (e) => {
    e.preventDefault();
    const { valid, error } = validateLogin({ data, password });
    if (!valid) {
      message.error(error, 5);
    } else {
      setErrorMessage("");
      const user = {
        data,
        password,
      };
      dispatch(LoginUser(user, history, message.error));
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
            <h1>Login</h1>
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
                  <Input onChange={(e) => setData(e.target.value)} />
                </Form.Item>
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
                <div className="base-text">
                  <Form.Item
                    {...tailLayout}
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>Remember me?</Checkbox>
                  </Form.Item>
                </div>
                <Form.Item {...tailLayout}>
                  <Button
                    onClick={logUserIn}
                    type="primary"
                    size="large"
                    disabled={
                      data === "" || password === ""
                        ? true
                        : state && state.loading_log
                        ? true
                        : false
                    }
                  >
                    {state && state.loading_log ? "Loading..." : "Login"}
                  </Button>
                </Form.Item>
              </Form>
              <div className="base-texts">
                Don't have an account? <Link to="/newregister">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
