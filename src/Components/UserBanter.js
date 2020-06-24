import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Spin, Avatar, Icon, Divider, Card, Modal } from 'antd';
import { useSelector } from 'react-redux';
import Carousel from 'react-images';
import LikeButton from '../util/LikeButton'




const UserBanter = (props) => {

    const banters = useSelector(state => state.banters)
    //const dispatch = useDispatch();

    const [modalIsOpen, setMoodalIsOpen] = useState(false);
    const [images, SetImages] = useState([]);

    if(banters && banters.banters){
      console.log(banters.banters)
    }

    const toggleModal = (bant) => {
       SetImages(bant);
       setMoodalIsOpen(true);
    };
    

    dayjs.extend(relativeTime);
    const { Meta } = Card;


    return(
        <div>
          {props.banters ? props.banters.map(bant => {
            return (<div key={bant._id}>
              <Meta key={bant._id} className="bant"
                 avatar={
                  !bant.userImage ?
                  <Avatar size={100} src='/images/no-img.png'/>
                  :  <Avatar size={100} src={'/BantedImages/profileImages/' + bant.userImage} />
                 }
                 title={bant.name  + '  ' + '  ' + '@' + bant.banterHandle + '  ' + '  ' + '-' + '  ' + dayjs(bant.createdAt).fromNow()}
                 description={bant.banter}
               /> 
               <br/>
               <div className="imageContainer" onClick={() => toggleModal(bant.banterImage)}>
                    <Carousel views={bant.banterImage} />
               </div>
               <br /><br/>
               <div id='icons'><Icon type="message" /> {bant.commentCount} &nbsp;&nbsp;&nbsp;&nbsp;  <LikeButton banterId={bant._id}/>  {bant.likeCount} </div>
               <Divider />
              </div>)      
          }): <div id="spin"><Spin size="large" /></div>}
          <Modal
          centered
          visible={modalIsOpen}
          onCancel={() => setMoodalIsOpen(false)}
          footer={null}
          >
            <p>
            <Carousel views={images} />
            </p>
          </Modal>
      </div>
);

}

export default UserBanter;