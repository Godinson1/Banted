import React from "react";
import {
  HeartOutlined,
  RetweetOutlined,
  UploadOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const BanterActions = ({ bant }) => {
  return (
    <div className="base-actions-container">
      <div className="icon-action">
        <MessageOutlined />{" "}
        <span className="count"> &nbsp; {bant.commentCount}</span>
      </div>
      <div className="icon-action">
        <RetweetOutlined />
        <span className="count"> &nbsp; {bant.rebantCount}</span>
      </div>
      <div className="icon-action">
        <HeartOutlined />
        <span className="count"> &nbsp; {bant.likeCount}</span>
      </div>
      <div className="icon-action">
        <UploadOutlined />
      </div>
    </div>
  );
};

export default BanterActions;
