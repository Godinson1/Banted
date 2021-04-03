import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import {
  MessageOutlined,
  RetweetOutlined,
  UploadOutlined,
  HeartFilled,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Markup } from "interweave";
import LikeButton from "../Components/likeButton";
import "../Pages/styles/main/main.scss";
import {
  getClassMediaNames,
  useCloseOnClickOutside,
  checkHashtag,
} from "../util";
import ReplyBanter from "../Components/ReplyBanter";

const Bant = ({ historyObject }) => {
  const location = useLocation();
  const [showRetweet, setShowRetweet] = useState(false);

  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShowRetweet);

  const bant = location.state.banter;

  return (
    <div>
      <div className="s">
        <div className="banter-header">
          <div>
            <ArrowLeftOutlined
              className="secondary-color"
              onClick={() => historyObject.goBack()}
            />
            &nbsp;&nbsp;&nbsp; Banter
          </div>
        </div>
        <div className="banter-view-container">
          <div id="account-bottom-banter">
            <div className="action-top-flex">
              <div>
                <HeartFilled />
              </div>
              <div>
                <span className="count">Somebody and 4 others liked</span>
              </div>
            </div>
            <div className="flex-start-banter">
              <div className="avatar-banter-bant">
                <img src={bant.userImage} alt="profile" />
              </div>
              <div className="nameHandle-container">
                <div>
                  <span id="name">{bant.name}</span>
                </div>
                <div className="handle-container">
                  <span id="handle">@{bant.banterHandle}</span>
                </div>
              </div>
            </div>
            <div className="font-white">
              {" "}
              <p className="bantext">
                {<Markup content={checkHashtag(bant.banter)} />}
              </p>
            </div>
            <div>
              {bant.banterImage.length !== 0 ? (
                <div className="image-banter">
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
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="base-info">
              {dayjs(bant.createdAt).format("h:mm A")} ·{" "}
              {dayjs(bant.createdAt).format("MMMM D, YYYY")} - Banted Web App
            </div>
            <div>
              <div className="base-info">
                <div className="actions-container">
                  <div className="action-flex">
                    <div
                      style={{ color: "white", fontWeight: 500 }}
                      className="icon-action-rebant tooltip"
                    >
                      {bant.commentCount}
                    </div>
                    <div>
                      <span className="count">Comments</span>
                    </div>
                  </div>
                  <div className="action-flex">
                    <div
                      style={{ color: "white", fontWeight: 500 }}
                      className="icon-action-rebant tooltip"
                    >
                      {bant.rebantCount}
                    </div>
                    <div>
                      <span className="count">Rebanters</span>
                    </div>
                  </div>
                  <div className="action-flex">
                    <span style={{ color: "white", fontWeight: 500 }}>
                      {bant.likeCount}
                    </span>
                    <div>
                      <span className="count">Likes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="actions-container-base">
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
                      <span className="count"></span>
                    </div>
                  </div>
                </Link>
                <div className="action-flex">
                  <div
                    onClick={() => setShowRetweet(!showRetweet)}
                    className="icon-action-rebant tooltip"
                  >
                    <RetweetOutlined />
                    <span className="tooltiptext">rebanter</span>
                  </div>
                  <div>
                    <span className="count"></span>
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
                <div className="action-flex">
                  <LikeButton banterId={"ehfedkkedkf"} />
                  <div>
                    <span className="count"></span>
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
            <ReplyBanter bant={bant} location={location} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bant;
