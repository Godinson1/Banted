import React from 'react';
import { Layout, Avatar, Menu} from 'antd';
import { Typography } from 'antd';
import img from '../download.jpg';
import Link from 'react-router-dom/Link';


const Navbar = () => {
    const { Header } = Layout;

    const { Title } = Typography;

    return (
        <Layout className="layout">
    <Header  style={{ padding: 10}}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '44px', float: 'right', paddingTop: 0}}
      >
        <Menu.Item key="1" ><Link to="/login">Login</Link></Menu.Item>
        <Menu.Item key="2" ><Link to="/register">Register</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/logout">Logout</Link></Menu.Item>
      </Menu>
      <Link to="/">
      <Avatar className="avatar" size={44} src={img}/>
      <Title level={2} style={{ color: 'white'}} className="banted">Banted</Title>
      </Link>
    </Header>
  </Layout>
    )
}

export default Navbar