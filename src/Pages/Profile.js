import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
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
import { LeftSideBar, RightSideBar } from "../Components";
import ProfileScreen from "../Components/ProfileScreen";
import { useViewport } from "../util";
import "./styles/main/main.scss";

const Profile = ({ location }) => {
  const [nav, setNav] = useState(false);
  const banters = useSelector((state) => state.banters);
  const { width } = useViewport();
  const history = useHistory();

  useEffect(() => {
    if (nav) {
      document.getElementById("myNav").style.width = "100%";
    } else {
      document.getElementById("myNav").style.width = "0%";
    }
  }, [nav]);

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
      {banters &&
        (banters.loading_banters ||
          banters.loading_banter ||
          banters.loading) && <div className="animated yt-loader"></div>}
      <div className="home-container">
        <div>{width < 768 ? "" : <LeftSideBar />}</div>
        <div className={width < 640 ? "mainbar-mobile" : "mainbar"}>
          <ProfileScreen
            historyObject={history}
            nav={nav}
            setNav={setNav}
            location={location}
          />
        </div>
        {width > 640 && (
          <div className="rightsidebar">
            <RightSideBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
