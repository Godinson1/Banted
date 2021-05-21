import React from "react";
import { NavLink } from "react-router-dom";
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

const Navbar = ({ setNav }) => {
  return (
    <div>
      <div id="myNav" className="overlay">
        <div className="overlay-content">
          <div className="flex-between navHeader">
            <div>Account Info</div>
            <div onClick={() => setNav(false)}>x</div>
          </div>

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
            <NavLink className="link" to="/explore" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <NumberOutlined />
                </div>
                <div>Explore</div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink
              className="link"
              to="/notifications"
              activeClassName="selected"
            >
              <div className="flex-start">
                <div>
                  <BellOutlined />
                </div>
                <div>Notifications</div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/messages" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <MailOutlined />
                </div>
                <div>Messages</div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink
              className="link"
              to="/bookmarks"
              activeClassName="selected"
            >
              <div className="flex-start">
                <div>
                  <BorderOuterOutlined />
                </div>
                <div>Bookmarks</div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/lists" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <UnorderedListOutlined />
                </div>
                <div>Lists</div>
              </div>
            </NavLink>
          </div>
          <div className="menued">
            <NavLink className="link" to="/profile" activeClassName="selected">
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
            <NavLink className="link" to="/login" activeClassName="selected">
              <div className="flex-start">
                <div>
                  <MinusCircleOutlined />
                </div>
                <div>Logout</div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
