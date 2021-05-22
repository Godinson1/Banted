import React from "react";
import { StarOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import "./styles.scss";
import { useHistory } from "react-router-dom";

const Header = ({ page, pageName, banterLength }) => {
  const history = useHistory();

  return (
    <div>
      <div className="main-header">
        <div>
          {page === "view-banter" ? (
            <div>
              <ArrowLeftOutlined onClick={() => history.goBack()} size={20} />{" "}
              &nbsp;Banter
            </div>
          ) : page === "profile" ? (
            <div className="flex">
              <div>
                <ArrowLeftOutlined onClick={() => history.goBack()} size={20} />
              </div>
              <div>
                <span className="white">{pageName}</span>
                <div id="profile-head-base">{banterLength} banters</div>
              </div>
            </div>
          ) : (
            "Home"
          )}
        </div>
        <div>
          {page === "view-banter" || page === "profile" ? (
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
