import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Markup } from "interweave";
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
import LikeButton from "./likeButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  getClassMediaNames,
  checkHashtag,
  useCloseOnClickOutside,
} from "../util";
import "../Pages/styles/main/main.scss";
import { deleteBanter } from "../actions/banterActions";

const Banter = ({ bant, i, location }) => {
  const [show, setShow] = useState(false);
  const [showRetweet, setShowRetweet] = useState(false);
  const [allowLink, setAllowLink] = useState(true);
  const user = useSelector((state) => state.users.credentials);
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShowRetweet, setAllowLink, setShow);

  return (
    <div>
      <Link
        to={{
          pathname: allowLink ? `/${bant.banterHandle}/status/${bant._id}` : "",
          state: { banter: bant },
        }}
        className="link"
      >
        <div key={i} className="account-bottom-banter">
          <div className="action-top-flex">
            <div>
              <HeartFilled />
            </div>
            <div>
              <span className="count">Somebody and 4 others liked</span>
            </div>
          </div>

          <div className="flex-start-banter">
            <div className="avatar-banter">
              <img src={bant.userImage} alt="profile" />
            </div>
            <div className="flex-between">
              <div className="nameHandle-container-banter">
                <div>
                  <span id="name">
                    {bant.name}{" "}
                    <span id="handle">
                      @{bant.banterHandle} - {dayjs(bant.createdAt).fromNow()}
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
                    key={bant._id}
                  >
                    {user && user.credentials ? (
                      <div>
                        {user.credentials[0].handle === bant.banterHandle && (
                          <div
                            className="option-container"
                            onClick={() =>
                              dispatch(deleteBanter(bant._id, setShow))
                            }
                          >
                            <span style={{ color: "#d5245c" }} id="name">
                              <DeleteOutlined /> &nbsp;&nbsp; Delete Banter
                            </span>
                          </div>
                        )}
                        {user.credentials[0].handle === bant.banterHandle && (
                          <div className="option-container">
                            <span id="name">
                              <UserAddOutlined /> &nbsp;&nbsp; Unfollow{" "}
                              {`@${bant.banterHandle}`}
                            </span>
                          </div>
                        )}
                        <div className="option-container">
                          <span id="name">
                            {" "}
                            <UnorderedListOutlined /> &nbsp;&nbsp; Add/Remove{" "}
                            {""}
                            {`@${bant.banterHandle}`} from Lists
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
          <div className="banter-text">
            <p className="bantext">
              {<Markup content={checkHashtag(bant.banter)} />}
            </p>
            <div className="display">
              {bant.banterImage.length !== 0 ? (
                <div className={getClassMediaNames(bant.banterImage)}>
                  {bant.banterImage.map((image, index) => {
                    return (
                      <div key={index} className="media-container">
                        <Link
                          to={{
                            pathname: `/${bant.banterHandle}/status/${
                              bant._id
                            }/photo/${bant.banterImage.indexOf(image) + 1}`,
                            state: {
                              background: location,
                              banter: bant,
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
                    banter: bant,
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
                    <span className="count">{bant.commentCount}</span>
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
                    <span className="count">{bant.rebantCount}</span>
                  </div>
                </div>
                {showRetweet && (
                  <div
                    ref={wrapperRef}
                    className="dropdown-retweet"
                    key={bant._id}
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
                <LikeButton banterId={bant._id} />
                <div>
                  <span
                    style={{ color: bant.likeCount !== 0 ? "#E0245E" : "" }}
                    className="count"
                  >
                    {bant.likeCount}
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
  );
};

export default Banter;
