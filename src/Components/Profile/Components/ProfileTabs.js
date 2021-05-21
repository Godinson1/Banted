import React from "react";
import { Tabs } from "antd";
import { Banters, BanterAndReplies, Images, Video, Likes } from "./index";

const ProfileTabs = () => {
  const { TabPane } = Tabs;

  return (
    <div>
      <div className="tab-container">
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab="Banters" key="1">
            <Banters />
          </TabPane>
          <TabPane tab="Banters & Replies" key="2">
            <BanterAndReplies />
          </TabPane>
          <TabPane tab="Images" key="3">
            <Images />
          </TabPane>
          <TabPane tab="Videos" key="4">
            <Video />
          </TabPane>
          <TabPane tab="Likes" key="5">
            <Likes />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileTabs;
