import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HomeFilled,
  NumberOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
  MinusCircleOutlined,
  BorderOuterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "../Pages/styles/main/main.scss";

const LeftSideBar = () => {
  const user = useSelector((state) => state.users.credentials);
  return (
    <div>
      <div className="f">
        <div className="logo">Banted.</div>
        <div className="menued">
          <NavLink className="link" to="/home" activeClassName="selected">
            <div className="flex-start">
              <div>
                <HomeFilled />
              </div>
              <div>Home</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/profile" activeClassName="selected">
            <div className="flex-start">
              <div>
                <NumberOutlined />
              </div>
              <div>Explore</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/login" activeClassName="selected">
            <div className="flex-start">
              <div>
                <BellOutlined />
              </div>
              <div>Notifications</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/login" activeClassName="selected">
            <div className="flex-start">
              <div>
                <MailOutlined />
              </div>
              <div>Messages</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/login" activeClassName="selected">
            <div className="flex-start">
              <div>
                <BorderOuterOutlined />
              </div>
              <div>Bookmarks</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/login" activeClassName="selected">
            <div className="flex-start">
              <div>
                <UnorderedListOutlined />
              </div>
              <div>Lists</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/login" activeClassName="selected">
            <div className="flex-start">
              <div>
                <UserOutlined />
              </div>
              <div>Profile</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <NavLink className="link" to="/login" activeClassName="selected">
            <div className="flex-start">
              <div>
                <MinusCircleOutlined />
              </div>
              <div>More</div>
            </div>
          </NavLink>
        </div>
        <div className="menued">
          <div className="banter-button-container">
            <button id="banter-button">Banter</button>
          </div>
        </div>
        <div className="account-bottom">
          {user && user.credentials ? (
            <div className="flex-start">
              <div className="avatar">
                {user && user.credentials && user.credentials[0].userImage ? (
                  <img
                    src={
                      "/BantedImages/profileImages/" +
                      user.credentials[0].userImage
                    }
                    alt="user"
                  />
                ) : (
                  <img src="/images/no-img.png" alt="user" />
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
              <div className="dots">...</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
