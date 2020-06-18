import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { 
  Layout, Input, Card, Button,
   Modal, Row, Col, Avatar, 
   Divider, Icon, Upload, Tooltip
  } from 'antd';


const Home = () => {

  const { TextArea } = Input;
  const { Content } = Layout;
  const { Meta } = Card;
  const [banters, setBanter] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get('/banters')
      .then(res => {
        setBanter(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }, []);


  const showModal = () => {
    setVisible(true);
  }
  
  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

dayjs.extend(relativeTime);
const bants = banters ? banters.map(bant => {  
         return (<div key={bant._id}>
         <Meta key={bant._id} className="bant"
            avatar={
              <Avatar size={100} src={'/BantedImages/profileImages/' + bant.userImage} />
            }
            title={'@' + bant.banterHandle + '  ' + '  ' + '-' + '  ' + dayjs(bant.createdAt).fromNow()}
            description={bant.banter}
          /> 
          <br/>
          <div className="imageContainer">
           {bant.banterImage.map(image => {
            return <img src={image} alt='img' width='200' id='bantImage' height='150'/>
          })} 
          </div>
          <br /><br/>
          <div id='icons'><Icon type="message" /> {bant.commentCount} &nbsp;&nbsp;&nbsp;&nbsp;  <Icon type="heart" />  {bant.likeCount} </div>
          <Divider />
         </div> 
         
         )   
         
}) : 'loading...';

    return (
     
        <Row>
          <Col span={18}>
          <div style={{ margin: '40px 250px' }} >
          <div className="scroll">
            <Card title="Banted" style={{ width: 700 }} extra={
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
              {bants} <br/>
            </Content>
            </Card>
            </div>
          </div>
          </Col>
          <Col span={6}><img alt='profile' src='/BantedImages/profileImages/ffff.jpg' alt='pimg'/></Col>
        </Row>
    );
  }

export default Home