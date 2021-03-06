import React, {useState} from 'react';
import { Form, Icon, Input, Button, Typography, Row, Col } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'react-router-dom/Link';
import { LoginUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';



const Login = (props) => {

  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => { 
    e.preventDefault();
    const user = {
      email,
      password
    }
    dispatch(LoginUser(user, props.history));
  }

  return (

    <div>
        <Row>
          <Col span={12}>
          <div className="login">
          <div className="form">
          <Title level={2}>Hey yo! Login</Title>
        <Form onSubmit={handleSubmit}>
        <FormItem>
        <Input
          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Email" value={email} name="email" onChange={handleEmailChange}
        />
        </FormItem>
        <Form.Item
          label=""
          hasFeedback
          validateStatus=""
          help=""
        >
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password" value={password} name="password" onChange={handlePasswordChange}
          placeholder="Password"
        />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" 
          className="login-form-button"
          disabled={state && state.errors && state.errors.loading_reg_log}
          >
             {state && state.errors && state.errors.loading_reg_log ? 
              'Logging in..' : ' Log in'} 
          </Button>
          &nbsp;&nbsp;Don't have an account ? <Link to="/register"> Register Here!</Link>
        </Form.Item>
    </Form>
    </div></div>
          </Col>
          <Col span={12}>
          <div id="reg-image">
            <img src="/images/lfans.png" alt="register" />
          </div>
          </Col>
        </Row>
    
</div>
  )
}

export default Login