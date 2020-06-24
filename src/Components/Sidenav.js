import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Layout, Input, Button,
    Modal, Avatar, Menu, Dropdown,
    Icon, Upload, Tooltip, Badge
   } from 'antd';
 import { PieChartOutlined, HomeOutlined,
          UserOutlined, NotificationOutlined,
          MessageOutlined, DownOutlined
 } from '@ant-design/icons';
 import { logoutUser, getUser } from '../actions/userActions';

const Sidenav = () => {

    const user = useSelector(state => state.users.credentials);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUser());
    }, [])
  

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const handleOk = e => setVisible(false);
    const handleCancel = e => setVisible(false);
    const { TextArea } = Input;

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <p onClick={() => dispatch(logoutUser())}>
              Logout
            </p>
          </Menu.Item>
          <Menu.Item key="1">
            <p>
              Add Account
            </p>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" disabled>
            Verified Banter
          </Menu.Item>
        </Menu>
      );


    return (
        <div>
            <Layout>
      <div className="side">
      <div className="first-side">
      <span className="menu"><li> Banted</li></span>
      <span className="menu"><li><HomeOutlined /> &nbsp; Home</li></span>
      <span className="menu"><li><PieChartOutlined /> &nbsp; Explore</li></span>
      <span className="menu"><li><MessageOutlined /> &nbsp; Message</li></span>
      <span className="menu"><li><Badge count={0}><NotificationOutlined /></Badge> &nbsp; Notifications</li></span>
      <span className="menu"><li><UserOutlined onClick={logoutUser}/> &nbsp; Profile</li></span>
      <span className="menu"><li>
      <Button size="large" onClick={showModal} shape="round">Banter Jare!</Button>
      </li>
      </span>
      <span className="menu">
        <li>
        {user && user.credentials ?
            (<span style={{color: 'white', fontSize: '15px'}}>
              {user && user.credentials && user.credentials[0].userImage ? 
              <Avatar size={50} src={'/BantedImages/profileImages/' + user.credentials[0].userImage} />
              : <Avatar size={50} src='/images/no-img.png'/>
              }
            &nbsp;<Dropdown overlay={menu} placement="topCenter">
            <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            &nbsp;{user.credentials[0].name} - @{user.credentials[0].handle}
            &nbsp; &nbsp; &nbsp; <DownOutlined />
            </span>
          </Dropdown>
            </span>)
            : ( <Avatar size={50} src='/images/no-img.png'/>)
        }
        </li>
      </span>
      </div>
      </div>
      </Layout>
      <Modal
          title="Banter Jare!"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={handleOk}>
              Banter
            </Button>,
          ]}
        >
          <Upload>
          <Tooltip title="Upload banter Image(s)">
              <Button>
              <Icon type="upload" />
            </Button>
          </Tooltip> 
          </Upload>
            <div style={{ margin: '24px 0' }} />
            <TextArea
              value=''
              placeholder="Create a banter"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
                
      </Modal>
    </div>
    );
}

export default Sidenav;