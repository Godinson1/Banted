import React, { useState } from 'react'
import { Form, Input, Icon, Typography, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'react-router-dom/Link';
import RegisterUser from '../actions/userActions';
import { useDispatch } from 'react-redux';


const signup = (props) => {

    const { Title } = Typography;
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [handle, setHandle] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = () => {
        setEmail(e.target.value);
    }

    const handleNameChange = () => {
        setName(e.target.value);
    }

    const handleHandleChange = () => {
        setHandle(e.target.value);
    }

    const handlePasswordChange = () => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            name,
            email,
            handle,
            password
        }
        dispatch(RegisterUser(newData, props.history));
        setEmail('');
        setHandle('');
        setPassword('');
        setName('');
    }

    return (
        <div className="form">
        <Title level={2}>Register to banter jare!</Title>
           <Form className="login-form" onSubmit={handleSubmit}>
                <FormItem>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter Name" value={name} name="name" onChange={handleNameChange}
                />
                </FormItem>
                <FormItem>
                <FormItem>
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email" value={email} name="email" onChange={handleEmailChange}
                    />
                </FormItem>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Banter Handle" value={handle} name="handle" onChange={handleHandleChange}
                />
                </FormItem>
                <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password" value={password} name="password" onChange={handlePasswordChange}
                />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    &nbsp;&nbsp;Already have an account ?<Link to="/login"> Login Here!</Link>
                </Form.Item>
       </Form>
   </div>
    )
}

export default signup