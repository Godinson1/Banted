import React, { useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  HomeFilled,
  NumberOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
  BorderOuterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { SIDEBAR_LINKS } from "./constants";
import "./styles.scss";
import { logoutUser } from "../../../actions/userActions";
import { useCloseOnClickOutside } from "../../../util";

const LeftSidebar = () => {
  const user = useSelector((state) => state.users.credentials);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShow);

  return (
    <div>
      <div className="left-sidebar-container">
        <div className="banter-logo">B</div>
        {SIDEBAR_LINKS.map((data, index) => {
          const { activeClassName, title, icon, path } = data;
          return (
            <div>
              <NavLink
                className="link"
                to={path}
                activeClassName={activeClassName}
              >
                <div className="flex-icon-name">
                  <div>
                    {icon === "HomeFilled" ? (
                      <HomeFilled />
                    ) : icon === "NumberOutlined" ? (
                      <NumberOutlined />
                    ) : icon === "BellOutlined" ? (
                      <BellOutlined />
                    ) : icon === "MailOutlined" ? (
                      <MailOutlined />
                    ) : icon === "BorderOuterOutlined" ? (
                      <BorderOuterOutlined />
                    ) : icon === "UnorderedListOutlined" ? (
                      <UnorderedListOutlined />
                    ) : icon === "UserOutlined" ? (
                      <UserOutlined />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>{title}</div>
                </div>
              </NavLink>
            </div>
          );
        })}
        <div>
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
            <div>
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
                <div className="dots">...</div>
                {show && (
                  <div ref={wrapperRef} className="dropdown-profile">
                    <div>
                      {user && user.credentials ? (
                        <div className="flex-start-account prof">
                          <div className="avatar">
                            {user &&
                              user.credentials &&
                              user.credentials[0].userImage && (
                                <img
                                  src={user.credentials[0].userImage}
                                  alt="user"
                                />
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
                        <span
                          style={{
                            fontSize: "0.9rem",
                          }}
                          id="name"
                        >
                          Add an existing account
                        </span>
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
                        <span
                          style={{
                            fontSize: "0.9rem",
                          }}
                          id="name"
                        >
                          Log Out @{user.credentials[0].handle}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
