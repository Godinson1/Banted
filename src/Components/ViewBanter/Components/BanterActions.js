import React from "react";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  RetweetOutlined,
  UploadOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const BanterActions = ({ location, bant }) => {
  return (
    <div className="base-actions-container">
      <div className="icon-action">
        <Link
          to={{
            pathname: `/compose/banter`,
            state: {
              background: location,
              banter: bant,
            },
          }}
          className="link"
        >
          <MessageOutlined />
        </Link>
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
