import React, { useState } from "react";
import dayjs from "dayjs";
import { CalendarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Tabs, Empty, Button } from "antd";
import "../Pages/styles/main/main.scss";
import "../Pages/styles/profile/profile.scss";
const ProfileScreen = ({ historyObject, location }) => {
  const { TabPane } = Tabs;
  return (
    <div>
      <div className="s">
        <div className="banter-header">
          <div className="flex-profile">
            <div>
              <ArrowLeftOutlined
                id="icon-arrow "
                className="secondary-color"
                onClick={() => historyObject.goBack()}
              />
            </div>
            <div className="flex-column">
              <div>Joseph Godwin</div>
              <div id="profile-head-base">1232 banters</div>
            </div>
          </div>
        </div>
        <div className="profile-details">
          <div className="cover-profile"></div>
          <div className="avatar-profile"></div>
          <div className="edit-profile-button">
            <button>Edit Profile</button>
          </div>
          <div className="profile-info">
            <div className="base">
              <div className="profile-name">Joseph Godwin</div>
              <div className="profile-handle">@godinson</div>
            </div>
            <div className="base bantext">Some status quotes goes here...</div>
            <div className="base">
              <div className="flex-profile">
                <div className="profile-location">Lagos</div>
                <div className="profile-join-date">
                  <div className="flex">
                    <div>
                      <CalendarOutlined /> &nbsp;
                    </div>
                    <div>Joined Febuary 2019</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="base">
              <div className="flex-profile">
                <div className="profile-following">
                  <span>3445</span> Following
                </div>
                <div className="profile-followers">
                  <span>3445</span> Followers
                </div>
              </div>
            </div>
            <div>
              <div className="tab-container">
                <Tabs defaultActiveKey="1" animated={false}>
                  <TabPane tab="Banters" key="1" style={{ color: "purple" }}>
                    <div className="history-container">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 60,
                        }}
                        description={<h4>NO TRENDING RESULTS FOUND</h4>}
                      >
                        <Button className="btn">Create Now</Button>
                      </Empty>
                    </div>
                  </TabPane>
                  <TabPane tab="Banters & Replies" key="2">
                    <div className="history-container">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 60,
                        }}
                        description={<h4>NO TRENDING RESULTS FOUND</h4>}
                      >
                        <Button className="btn">Create Now</Button>
                      </Empty>
                    </div>
                  </TabPane>
                  <TabPane tab="Images" key="3">
                    <div className="history-container">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 60,
                        }}
                        description={<h4>NO FAVOURITE RESULTS FOUND</h4>}
                      >
                        <Button className="btn">Create Now</Button>
                      </Empty>
                      ,
                    </div>
                  </TabPane>
                  <TabPane tab="Videos" key="4">
                    <div className="history-container">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 60,
                        }}
                        description={<h4>NO FAVOURITE RESULTS FOUND</h4>}
                      >
                        <Button className="btn">Create Now</Button>
                      </Empty>
                      ,
                    </div>
                  </TabPane>
                  <TabPane tab="Likes" key="5">
                    <div className="history-container">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 60,
                        }}
                        description={<h4>NO FAVOURITE RESULTS FOUND</h4>}
                      >
                        <Button className="btn">Create Now</Button>
                      </Empty>
                      ,
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
