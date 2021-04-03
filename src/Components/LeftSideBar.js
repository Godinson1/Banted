import React, { useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { Divider } from "antd";
import "../Pages/styles/main/main.scss";
import { logoutUser } from "../actions/userActions";
import { useCloseOnClickOutside } from "../util";

const LeftSideBar = () => {
  const user = useSelector((state) => state.users.credentials);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShow);

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
          <NavLink className="link" to="/bookmarks" activeClassName="selected">
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
          <Link
            to={{
              pathname: `/compose/banter`,
              state: {
                background: location,
                banter: null,
              },
            }}
            className="link"
          >
            <div className="banter-button-container">
              <button id="banter-button">Banter</button>
            </div>
          </Link>
        </div>
        <div className="account-bottom" onClick={() => setShow(!show)}>
          {user && user.credentials ? (
            <div className="flex-start-account">
              <div className="avatar">
                {user && user.credentials && user.credentials[0].userImage && (
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
              <div className="dots">...</div>
              {show && (
                <div ref={wrapperRef} className="dropdown-profile">
                  <div>
                    {user && user.credentials ? (
                      <div className="flex-start-account prof">
                        <div className="avatar">
                          {user &&
                          user.credentials &&
                          user.credentials[0].userImage ? (
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
                        <div className="nameHandle-container">
                          <div>
                            <span id="name">{user.credentials[0].name}</span>
                          </div>
                          <div className="handle-container">
                            <span id="handle">
                              @{user.credentials[0].handle}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <Divider
                      style={{
                        marginTop: 10,
                        backgroundColor: "rgb(90, 89, 89)",
                      }}
                    />
                    <div
                      id="base-bottom"
                      onClick={() => dispatch(logoutUser())}
                    >
                      <span id="name">Add an existing account</span>
                    </div>
                    <Divider
                      style={{
                        marginTop: 0,
                        backgroundColor: "rgb(90, 89, 89)",
                      }}
                    />
                    <div
                      id="base-bottom"
                      onClick={() => dispatch(logoutUser())}
                    >
                      <span id="name">
                        Log Out @{user.credentials[0].handle}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
