import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CalendarOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useLocation, useRouteMatch } from "react-router-dom";
import { getUser } from "../../actions/userActions";
import { ProfileTabs } from "./Components";
import Layout from "../Layout";
import "./profile.scss";

const Profile = () => {
  const user = useSelector((state) => state.users);
  const location = useLocation();
  const dispatch = useDispatch();
  const bant = location.state.banter;
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getUser(url.slice(1)));
  }, [dispatch, url]);

  return (
    <div>
      <Layout
        page="profile"
        pageName={bant.name}
        banterLength={
          user &&
          user.profile &&
          user.profile.banters &&
          user.profile.banters.length
        }
      >
        <div className="s">
          <div className="cover-banner">
            <div className="flex-profile"></div>
          </div>
          <div className="cover-profile"></div>
          <div className="avatar-profile">
            <img src={bant.userImage} alt="profile" />
          </div>
          {user && user.credentials && user.credentials.credentials ? (
            <div>
              {user.credentials.credentials[0].handle ===
              location.pathname.slice(1) ? (
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
          {user.loading_profile ? (
            <div className="loading-profile">
              <Skeleton active />
            </div>
          ) : (
            user &&
            user.profile &&
            user.profile.userInformation && (
              <div className="profile-info">
                <div className="base">
                  <div className="profile-name">{bant.name}</div>
                  <div className="profile-handle">
                    @{bant.banterHandle || bant.handle}
                  </div>
                </div>
                <div className="base bantext">
                  Some status quotes goes here...
                </div>
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
                      <span>
                        {user &&
                          user.profile &&
                          user.profile.userInformation &&
                          user.profile.following.length}
                      </span>{" "}
                      Following
                    </div>
                    <div className="profile-followers">
                      <span>
                        {user &&
                          user.profile &&
                          user.profile.userInformation &&
                          user.profile.followers.length}
                      </span>{" "}
                      Followers
                    </div>
                  </div>
                </div>
                <div>
                  <ProfileTabs />
                </div>
              </div>
            )
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
