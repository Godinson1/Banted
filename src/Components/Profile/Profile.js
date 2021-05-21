import React from "react";
import { useSelector } from "react-redux";
import { CalendarOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ProfileTabs } from "./Components";
import Layout from "../Layout";
import "./profile.scss";

const Profile = () => {
  const user = useSelector((state) => state.users.credentials);
  const location = useLocation();
  const bant = location.state.banter;

  return (
    <div>
      <Layout page="profile" pageName={bant.name}>
        <div className="s">
          <div className="cover-banner">
            <div className="flex-profile"></div>
          </div>
          <div className="cover-profile"></div>
          <div className="avatar-profile">
            <img src={bant.userImage} alt="profile" />
          </div>
          {user && user.credentials ? (
            <div>
              {user.credentials[0].handle === location.pathname.slice(1) ? (
                <div className="edit-profile-button">
                  <button>Edit Profile</button>
                </div>
              ) : (
                <div className="edit-profile-button">
                  <button>Follow</button>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="profile-info">
            <div className="base">
              <div className="profile-name">{bant.name}</div>
              <div className="profile-handle">
                @{bant.banterHandle || bant.handle}
              </div>
            </div>
            <div className="base bantext">Some status quotes goes here...</div>
            <div className="base">
              <div className="flex-profile">
                <div className="profile-location">Lagos</div>
                <div className="profile-join-date">
                  <div className="flex">
                    <div>
                      <CalendarOutlined /> &nbsp;
                    </div>
                    <div>Joined Febuary 2019</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="base">
              <div className="flex-profile">
                <div className="profile-following">
                  <span>3445</span> Following
                </div>
                <div className="profile-followers">
                  <span>3445</span> Followers
                </div>
              </div>
            </div>
            <div>
              <ProfileTabs />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
