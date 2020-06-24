import React, { useState } from 'react';
import { 
   Layout, Card, Button,
   Modal, Row, Col
  } from 'antd';
import { useDispatch } from 'react-redux';
import Banter from '../Components/Banters';
import Sidenav from '../Components/Sidenav';
import RightSidenav from '../Components/RightSidenav';
import CreateBanter from '../util/CreateBanter';



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
      <Layout>
        <Content>
          <div >
            <Card title="Banted" style={{ width: '100%' }} extra={
            <Button type="primary" onClick={() => dispatch(showModal)}>
               Bant
             </Button>
            }>
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