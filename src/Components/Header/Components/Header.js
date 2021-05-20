import React from "react";
import { StarOutlined } from "@ant-design/icons";
import "./styles.scss";

const Header = () => {
  return (
    <div>
      <div className="main-header">
        <div>Home</div>
        <div>
          <StarOutlined className="icon-header" />
        </div>
      </div>
    </div>
  );
};

export default Header;
