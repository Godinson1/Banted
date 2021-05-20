import React from "react";
import { useSelector } from "react-redux";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import "./styles.scss";

const RightSidebarBanter = () => {
  const user = useSelector((state) => state.users.credentials);
  return (
    <div>
      <div className="t">
        <div>
          <div className="right-bar-search-container">
            <div className="search-flex-between">
              <div className="search-flex">
                <div>
                  <SearchOutlined className="search-icon" />
                </div>
                <div className="search-input-container">
                  <input type="text" placeholder="Search Banted" />
                </div>
              </div>
              <div className="search-close-container">
                <CloseOutlined className="search-close-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="relevant-container">
          <div className="trend-header">
            <div>Relevant People</div>
          </div>
          <div className="account-bottom-banter-rightbar">
            {user && user.credentials ? (
              <div className="flex-start-account">
                <div className="avatar">
                  {user &&
                    user.credentials &&
                    user.credentials[0].userImage && (
                      <img src={user.credentials[0].userImage} alt="user" />
                    )}
                </div>
                <div className="nameHandle-container">
                  <div>
                    <span id="name">{user.credentials[0].name}</span>
                  </div>
                  <div className="handle-container">
                    <span id="handle">@{user.credentials[0].handle}</span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="banted-footer">Banted - &copy; 2021.</div>
      </div>
    </div>
  );
};

export default RightSidebarBanter;
