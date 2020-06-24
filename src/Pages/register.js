import React, { useState } from 'react'
import { Form, Input, Icon, Typography, Button, Row,
        Col, message, Spin
       } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'react-router-dom/Link';
import {RegisterUser} from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


const Signup = (props) => {

    const { Title } = Typography;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    
    if(state && state.errors && state.errors.errors) {
        message.error(state.errors.errors.error, 7);
    }
    

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [handle, setHandle] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleHandleChange = (e) => setHandle(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            name,
            email,
            handle,
            password
        }
        dispatch(RegisterUser(newData, props.history));
    }

    return (
        <div className="form">
            <Row>
                <Col span={12}>
                    <div id="reg-image">
                    <img src="/images/fans.png" alt="register" />
                    </div>
                </Col>
                <Col span={12}>
                <div className="register">
                <div className="register-content">
                <Title level={2}>Register to banter jare!</Title>
                    <Form className="login-form" onSubmit={handleSubmit}>
                    <FormItem>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter Name" value={name} name="name" onChange={handleNameChange}
                        required
                    />
                    </FormItem>
                    <FormItem>
                    <FormItem>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email" value={email} name="email" 
                            onChange={handleEmailChange}
                            required
                        />
                    </FormItem>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Banter Handle" value={handle} name="handle" 
                        onChange={handleHandleChange} required
                    />
                    </FormItem>
                    <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password" value={password} name="password" 
                        onChange={handlePasswordChange} required
                    />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" 
                         className="login-form-button"
                         disabled={state && state.errors && state.errors.loading_reg_log}
                         >
                            {state && state.errors && state.errors.loading_reg_log ? 
                            <span id="log-reg">Registering..<Spin size="small" /></span> : ' Register'} 
                        </Button>
                        &nbsp;&nbsp;Already have an account ?<Link to="/login"> Login Here!</Link>
                    </Form.Item>
                </Form>
                </div></div>
                </Col>
            </Row>
   </div>
    )
}

export default Signup