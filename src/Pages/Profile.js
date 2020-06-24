import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom'
import { 
   Layout, Tabs,
   Row, Col, Avatar,
   Spin, Divider
  } from 'antd';
import {CalendarOutlined, EnvironmentOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { getUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import Sidenav from '../Components/Sidenav';
import RightSidenav from '../Components/RightSidenav';
import UserBanter from '../Components/UserBanter';
import FollowButton from '../util/FollowButton';
import ProfileFollowerButton from '../util/ProfileFollowerButton';




const Profile = (props) => {

  //AntDesign Destructuring..
  const { Content } = Layout;
 
  const { handle } = queryString.parse(props.location.search);

  const dispatch = useDispatch();
  const user = useSelector(state => state.users);
  const main = useRef();

  useEffect(() => {
    dispatch(getUser(handle));
  }, [handle]);


  //Format period user joined
  dayjs.extend(relativeTime);

  const { TabPane } = Tabs;

    function callback(key) {
    console.log(key);
    }

  

    return (

     <div>
     <Row>
     <Col span={6}>
        <Sidenav/>
     </Col>
     <Col span={12}>
      <Layout>
        <Content>
          <div ref={main}>
          {user && user.profile && user.profile.followers && 
          user.profile.following && user.profile.userInformation ? (
          <div>
            <div id="top-prof">
             <ArrowLeftOutlined className="back" onClick={() => props.history.goBack()}/>
             &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
             <small id="name"><strong id="name-prof">{user.profile.userInformation[0].name}</strong><br/>
                <strong id="handle-profs">{user.profile.banters.length} Banters</strong>
              </small>
            </div>
           <div className="banner">
           <div className="top">
            <span id="avatar-profile">
            {!user.profile.userInformation[0].userImage ? (
              <Avatar size={150} src='/images/no-img.png'/>
            ) : (
              <Avatar size={150} src={'/BantedImages/profileImages/' + user.profile.userInformation[0].userImage} />
            )}
            </span>
            <span id="avatar-profiles">
            <FollowButton handle={handle} />
            </span>
            </div></div></div>
            ): (<span id="avatar-profile"><Avatar size={150} src='/images/no-img.png'/></span>) 
            }
            {user && user.profile && user.profile.userInformation ? (
                <div className="info">
                <small id="name"><strong id="name-prof">{user.profile.userInformation[0].name}</strong><br/>
                <strong id="handle-prof">@{user.profile.userInformation[0].handle}</strong>
                </small>
                <div id="cont">
                    <strong>
                        <EnvironmentOutlined /> Lagos &nbsp; &nbsp; &nbsp;
                        <CalendarOutlined /> Joined {dayjs(user.profile.userInformation[0].createdAt).fromNow()}</strong>
                    <p id="fol">
                        <strong>{user.profile.userInformation[0].following}</strong> - Following
                        &nbsp; &nbsp; &nbsp;
                        <strong>{user.profile.userInformation[0].followers}</strong> - Followers
                    </p>
                </div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Banters" key="1">
                <UserBanter banters={user.profile.banters}/>
                </TabPane>
                <TabPane tab="Banter & Comments" key="2">
                <div id="spins"><Spin size="large"/></div>
                </TabPane>
                <TabPane tab="Media" key="3">
                <div id="spins"><Spin size="large"/></div>
                </TabPane>
                <TabPane tab="Likes" key="4">
                <div id="spins"><Spin size="large"/></div>
                </TabPane>
                <TabPane tab="Following" key="5">
                {user.profile.following.length == 0 ? 
                    <span id="isFol">You are not following anyone..</span>
                    : <div>
                  {user.profile.following.map((follow) => {
                    return  <div key={follow._id} id="dove">
                    <div>
                      {!follow.userImage ?
                      <Avatar size={50} src='/images/no-img.png'/>
                      : <Avatar size={150} src={'/BantedImages/profileImages/' + follow.userImage} />}
                    </div>
                   <div id="nn">
                   <Link to={`/profile?handle=${follow.handle}`}>
                   <span id="op">{follow.name}</span><br/>
                    <span id="os">@{follow.handle}</span>
                    </Link>
                   </div>
                   <div id="ss">
                   <FollowButton handle={follow.handle}/>
                   </div>
                   <Divider />
                    </div>
                  })}</div>
                }
                </TabPane>
                <TabPane tab="Followers" key="6">
                {user.profile.followers.length == 0 ? (
                    <span id="isFol">No Followers Yet..</span>
                ): <div>
                {user.profile.followers.map((follow) => {
                  return  <div key={follow._id} id="dove">
                  <div>
                    {!follow.followerImage ?
                    <Avatar size={50} src='/images/no-img.png'/>
                    : <Avatar size={150} src={'/BantedImages/profileImages/' + follow.followerImage} />}
                  </div>
                 <div id="nn">
                 <Link to={`/profile?handle=${follow.followerHandle}`}>
                  <span id="op">{follow.followerName}</span><br/>
                  <span id="os">@{follow.followerHandle}</span>
                  </Link>
                 </div>
                 <div id="ss">
                 <ProfileFollowerButton handle={follow.followerHandle}/>
                 </div>
                 <Divider />
                  </div>
                })}</div>}
                </TabPane>
                </Tabs>
                </div>
            ):('')}
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
  </div>
     
        
    );
  }

export default Profile;