import React, { useState } from 'react';
import { 
   Layout, Card, Button, Avatar,
   Modal, Row, Col, Divider
  } from 'antd';
import { useDispatch } from 'react-redux';
import Banter from '../Components/Banters';
import Sidenav from '../Components/Sidenav';
import RightSidenav from '../Components/RightSidenav';
import CreateBanter from '../util/CreateBanter';
import {PictureOutlined,  SmileOutlined} from '@ant-design/icons';



const Home = () => {

  //AntDesign Destructuring..
  const { Content } = Layout;

  const dispatch = useDispatch();
  //const user = useSelector(state => state.users.credentials);


  //State
  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);
  const handleCancel = e => setVisible(false);


    return (

     <div>
     <Row>
     <Col span={6}>
        <Sidenav/>
     </Col>
     <Col span={12}>
        <Content>
          <div className="bo">
          <div className="create">
          <div className="grid-home">
          <div>
          <span id="home">Home</span>
          </div>
          <div>
          <span id="home">Home</span>
          </div>
          </div>
          <Divider />
          <div id="dove">
           <div>
            <Avatar size={70} src='/images/no-img.png'/>
            </div>
           <div id="nn">
           <input className="input-searchs" placeholder="Whats happening?"/>
           </div>
           <div>
           </div>
           <div className="grid-homes">
          <div id="pic">
          <PictureOutlined />   < SmileOutlined />
          </div>
          <div>
          <span id="homes">
            <btn className="followings">Create Banter</btn>
          </span>
          </div>
          </div>
           </div>
          </div>
          <Banter/> <br/>
          </div>
        </Content>
        </Col>
      <Col span={6}>
       <div className="side">
        <RightSidenav />
       </div>
      </Col>
    </Row>
    <Modal
      title="Banter Jare!"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
    <CreateBanter />
    </Modal>
  </div>
     
        
    );
  }

export default Home