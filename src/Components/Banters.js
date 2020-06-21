import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Spin, Avatar, Icon, Divider, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-images';

const Banter = () => {

    const banters = useSelector(state => state.banters)
    const dispatch = useDispatch();

    if(banters && banters.banters){
      console.log(banters.banters)
    }
    

    dayjs.extend(relativeTime);
    const { Meta } = Card;


    return(
        <div>
          {banters && banters.banters ? banters.banters.map(bant => {
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
              </div>)      
          }): <Spin size="large" />}
      </div>
);

}

export default Banter;