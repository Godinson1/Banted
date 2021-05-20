import React from "react";
import {
  HeartOutlined,
  RetweetOutlined,
  UploadOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const BanterActions = () => {
  return (
    <div className="base-actions-container">
      <div className="icon-action">
        <MessageOutlined />
      </div>
      <div className="icon-action">
        <RetweetOutlined />
      </div>
      <div className="icon-action">
        <HeartOutlined />
      </div>
      <div className="icon-action">
        <UploadOutlined />
      </div>
    </div>
  );
};

export default BanterActions;
