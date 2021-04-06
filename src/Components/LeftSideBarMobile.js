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

const LeftSideBarMobile = () => {
  const user = useSelector((state) => state.users.credentials);

  return (
    <div>
      <div className="leftsidebar">
        <div className="fm">
          <div className="logo">B.</div>
          <div className="menued">
            <NavLink className="link" to="/home" activeClassName="selected">
              <div className="flex-start">
                <div className="tooltip">
                  <HomeFilled />
                  <span class="tooltiptext">Home</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/profile" activeClassName="selected">
              <div className="flex-start">
                <div className="tooltip">
                  <NumberOutlined />
                  <span class="tooltiptext">Home</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <BellOutlined />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <MailOutlined />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <BorderOuterOutlined />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <UnorderedListOutlined />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <UserOutlined />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <MinusCircleOutlined />
                </div>
              </div>
            </NavLink>
          </div>

          <div className="account-bottom">
            {user && user.credentials ? (
              <div className="flex-start-account">
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
                    <img src="/images/noimg.png" alt="user" />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarMobile;
