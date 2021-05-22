import React from "react";
import { Tabs } from "antd";
import { Banters, BanterAndReplies, Images, Likes } from "./index";

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
          <TabPane tab="Banters with Images" key="3">
            <Images />
          </TabPane>
          <TabPane tab="Likes" key="4">
            <Likes />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileTabs;
