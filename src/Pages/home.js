import React, { useState } from 'react';
import { 
   Layout, Input, Card, Button,
   Modal, Row, Col, Avatar, Menu, Dropdown,
   Divider, Icon, Upload, Tooltip, 
  } from 'antd';
import { PieChartOutlined, HomeOutlined,
         UserOutlined, NotificationOutlined,
         MessageOutlined, DownOutlined
} from '@ant-design/icons';
import { logoutUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Banter from '../Components/Banters';



const Home = () => {

  //AntDesign Destructuring..
  const { TextArea } = Input;
  const { Meta } = Card;
  const { Content } = Layout;

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.credentials);

  if(user && user.credentials) {
    console.log(user.credentials[0].userImage);
  }


  //State
  const [banters, setBanter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState(1);


  const showModal = () => setVisible(true);
  const handleOk = e => setVisible(false);
  const handleCancel = e => setVisible(false);

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
     <Row>
     <Col span={6}>
     <Layout>
      <div className="side">
      <div className="first-side">
      <span className="menu"><li><HomeOutlined /> &nbsp; Banted</li></span>
      <span className="menu"><li><HomeOutlined /> &nbsp; Home</li></span>
      <span className="menu"><li><PieChartOutlined /> &nbsp; Explore</li></span>
      <span className="menu"><li><MessageOutlined /> &nbsp; Message</li></span>
      <span className="menu"><li><NotificationOutlined /> &nbsp; Notifications</li></span>
      <span className="menu"><li><UserOutlined onClick={logoutUser}/> &nbsp; Profile</li></span>
      <span className="menu"><li>
      <Button size="large" onClick={showModal} shape="round">Banter Jare!</Button>
      </li>
      </span>
      <span className="menu">
        <li>
        {user && user.credentials ?
            (<span style={{color: 'white', fontSize: '15px'}}>
            <Avatar size={50} src={'/BantedImages/profileImages/' + user.credentials[0].userImage} />
            &nbsp;<Dropdown overlay={menu} placement="topCenter">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            &nbsp;{user.credentials[0].name} - @{user.credentials[0].handle}
            &nbsp; &nbsp; &nbsp; <DownOutlined />
            </a>
          </Dropdown>
            </span>)
            : ('')
        }
        </li>
      </span>
      </div>
      </div>
      </Layout>
      </Col>
      <Col span={12}>
      <Layout>
        <Content>
          <div >
            <Card title="Banted" style={{ width: '100%' }} extra={
            <Button type="primary" onClick={showModal}>
               Bant
             </Button>
            }>
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
            <Content>
             <Banter/> <br/>
            </Content>
            </Card>
            </div>
        </Content>
        </Layout>
        </Col>
      <Col span={6}>
       <div className="side">
        
       </div>
      </Col>
    </Row>
  </div>
     
        
    );
  }

export default Home