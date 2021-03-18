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
           <div id="doves">
              <div>
              {
                !bant.userImage ?
                <Avatar size={70} src='/images/no-img.png'/>
                :  <Avatar size={70} src={'/BantedImages/profileImages/' + bant.userImage} />
              }
              </div>
              <div id="nn">
              <span id="os">
                {bant.name} @{bant.banterHandle}
              - {dayjs(bant.createdAt).fromNow()}
              </span><br/>
                <span id="os">{bant.banter}</span>
                {bant.banterImage.length !== 0 ? (
                 <div className="imageContainer" onClick={() => toggleModal(bant.banterImage)}>
                 
                  </div>
                ):('')}
                <p style={{ marginTop: "5px" }}>
                <Icon id="comment" type="message" />&nbsp;  
                <span id="count">{bant.commentCount}</span>
                `&nbsp;&nbsp;  
                 <LikeButton banterId={bant._id}/>
                <span id="count">
                {bant.likeCount}
                </span> 
                </p>
              </div>
              </div>
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