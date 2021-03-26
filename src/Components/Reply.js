import React from "react";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  RetweetOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./likeButton";
import { getClassMediaNames } from "../util";

const Reply = ({ bant, location }) => {
  dayjs.extend(relativeTime);
  return (
    <div>
      <div className="replies">
        <div className="flex-start-banter">
          <div className="avatar-banter">
            {!bant.userImage ? (
              <img src="/images/noimg.png" alt="no-profile" />
            ) : (
              <img
                src={"/BantedImages/profileImages/" + bant.userImage}
                alt="profile"
              />
            )}
          </div>
          <div className="flex-between-replies">
            <div className="nameHandle-container-banter">
              <div style={{ display: "flex" }}>
                <div className="text-handle">
                  <span id="name">
                    {bant.name} <span id="handle">@{bant.banterHandle} </span>
                  </span>
                </div>
                <div>
                  <span id="handle">- {dayjs(bant.createdAt).fromNow()}</span>
                  <div className="dots">...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reply-to">
          <span id="reply">
            Replying to <span id="reply-handle">@{bant.banterHandle}</span>
          </span>
        </div>
        <div className="banter-text">
          <p className="bantext">{bant.banter}</p>
          <div className="display">
            {bant.banterImage.length !== 0 ? (
              <div className={getClassMediaNames(bant.banterImage)}>
                {bant.banterImage.map((image, index) => {
                  return (
                    <div className="media-container">
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
          <div>
            <div className="actions-container">
              <div className="action-flex">
                <div className="actions-flex-actions">
                  <div>
                    <MessageOutlined />{" "}
                  </div>
                  <div>
                    <span className="count">{bant.commentCount}</span>
                  </div>
                  <span className="count"></span>
                </div>
              </div>
              <div className="action-flex">
                <div className="actions-flex-actions">
                  <div>
                    <RetweetOutlined />
                  </div>
                  <div>
                    <span className="count">123</span>
                  </div>
                </div>
              </div>
              <div className="action-flex">
                <div className="actions-flex-actions">
                  <div>
                    <LikeButton banterId={bant._id} /> {""}
                  </div>
                  <div>
                    <span
                      style={{
                        color: bant.likeCount !== 0 ? "#E0245E" : "",
                      }}
                      className="count"
                    >
                      {bant.likeCount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="action-flex">
                <div className="icon-action tooltip">
                  <UploadOutlined />
                  <span class="tooltiptext">share</span>
                </div>
                <div>
                  <span className="count"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
