import React from "react";
import { StarOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import "./styles.scss";
import { useHistory } from "react-router-dom";

const Header = ({ page }) => {
  const history = useHistory();
  return (
    <div>
      <div className="main-header">
        <div>
          {page === "view-banter" ? (
            <div>
              <ArrowLeftOutlined onClick={() => history.goBack()} size={20} />{" "}
              Banter
            </div>
          ) : (
            "Home"
          )}
        </div>
        <div>
          {page === "view-banter" ? (
            ""
          ) : (
            <StarOutlined className="icon-header" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
