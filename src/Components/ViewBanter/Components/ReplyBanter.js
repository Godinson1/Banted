import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MessageOutlined,
  RetweetOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  HeartFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";
import { Markup } from "interweave";
import { deleteBanter } from "../../../actions/banterActions";

//import "./styles/reply-banter/index.scss";
import {
  getClassMediaNames,
  checkHashtag,
  useCloseOnClickOutside,
} from "../../../util";

const ReplyBanter = ({ bant, banter, index, location }) => {
  const user = useSelector((state) => state.users.credentials);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showRetweet, setShowRetweet] = useState(false);
  const [allowLink, setAllowLink] = useState(true);

  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShowRetweet, setAllowLink, setShow);

  dayjs.extend(dayjsTwitter);

  return (
    <div>
      <div>
        <Link
          to={{
            pathname: allowLink
              ? `/${banter.banterHandle}/status/${banter._id}`
              : "",
            state: { banter: banter },
          }}
          className="link"
        >
          <div key={index} className="account-bottom-banter">
            <div className="flex-start-banter">
              <div className="avatar-banter">
                <img src={banter.userImage} alt="profile" />
              </div>
              <div className="flex-between">
                <div className="nameHandle-container-banter">
                  <div>
                    <span id="name">
                      {banter.name}{" "}
                      <span id="handle">
                        @{banter.banterHandle} -{" "}
                        {dayjs(banter.createdAt).twitter()}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="action-flex">
                  <div
                    id="dots"
                    onMouseOver={() => setAllowLink(false)}
                    className="dots tooltip"
                    onClick={() => setShow(!show)}
                  >
                    ...
                    <span style={{ fontSize: "1rem" }} className="tooltiptext">
                      more
                    </span>
                  </div>
                  {show && (
                    <div
                      ref={wrapperRef}
                      className="dropdown-banter"
                      key={banter._id}
                    >
                      {user && user.credentials ? (
                        <div>
                          {user.credentials[0].handle ===
                            banter.banterHandle && (
                            <div
                              className="option-container"
                              onClick={() =>
                                dispatch(deleteBanter(banter._id, setShow))
                              }
                            >
                              <span style={{ color: "#d5245c" }} id="name">
                                <DeleteOutlined /> &nbsp;&nbsp; Delete Banter
                              </span>
                            </div>
                          )}
                          {user.credentials[0].handle ===
                            banter.banterHandle && (
                            <div className="option-container">
                              <span id="name">
                                <UserAddOutlined /> &nbsp;&nbsp; Unfollow{" "}
                                {`@${banter.banterHandle}`}
                              </span>
                            </div>
                          )}
                          <div className="option-container">
                            <span id="name">
                              {" "}
                              <UnorderedListOutlined /> &nbsp;&nbsp; Add/Remove{" "}
                              {""}
                              {`@${banter.banterHandle}`} from Lists
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="reply-to-bant">
              <span id="reply">
                Replying to <span id="reply-handle">@{bant.banterHandle}</span>
              </span>
            </div>
            <div className="banter-text">
              <p className="bantext">
                {<Markup content={checkHashtag(banter.banter)} />}
              </p>
              <div className="display">
                {banter.banterImage.length !== 0 ? (
                  <div className={getClassMediaNames(banter.banterImage)}>
                    {banter.banterImage.map((image, index) => {
                      return (
                        <div key={index} className="media-container">
                          <Link
                            to={{
                              pathname: `/${banter.banterHandle}/status/${
                                banter._id
                              }/photo/${banter.banterImage.indexOf(image) + 1}`,
                              state: {
                                background: location,
                                banter: banter,
                              },
                            }}
                            className="link"
                          >
                            {<img src={image} alt="banter" />}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="actions-container">
                <Link
                  to={{
                    pathname: `/compose/banter`,
                    state: {
                      background: location,
                      banter: banter,
                    },
                  }}
                  className="link"
                >
                  <div className="action-flex">
                    <div className="icon-action tooltip">
                      <MessageOutlined />
                      <span className="tooltiptext">comment</span>
                    </div>
                    <div>
                      <span className="count">{banter.commentCount}</span>
                    </div>
                  </div>
                </Link>
                <div>
                  <div className="action-flex">
                    <div
                      className="icon-action-rebant tooltip"
                      onClick={() => setShowRetweet(!showRetweet)}
                    >
                      <RetweetOutlined />
                      <span className="tooltiptext">rebanter</span>
                    </div>
                    <div>
                      <span className="count">{banter.rebantCount}</span>
                    </div>
                  </div>
                  {showRetweet && (
                    <div
                      ref={wrapperRef}
                      className="dropdown-retweet"
                      key={banter._id}
                    >
                      <div className="option-container">
                        <span id="name">
                          {" "}
                          <RetweetOutlined /> &nbsp;&nbsp; Rebant
                        </span>
                      </div>
                      <div className="option-container">
                        <span id="name">
                          {" "}
                          <EditOutlined /> &nbsp;&nbsp; Quote Banter
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="action-flex">
                  <HeartFilled />
                  <div>
                    <span
                      style={{
                        color: banter.likeCount !== 0 ? "#E0245E" : "",
                      }}
                      className="count"
                    >
                      {banter.likeCount}
                    </span>
                  </div>
                </div>
                <div className="action-flex">
                  <div className="icon-action tooltip">
                    <UploadOutlined />
                    <span className="tooltiptext">share</span>
                  </div>
                  <div>
                    <span className="count"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ReplyBanter;
