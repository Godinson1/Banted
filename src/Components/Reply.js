import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Markup } from "interweave";
import {
  UploadOutlined,
  RetweetOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";
import { getCommentsOnBanter } from "../actions/banterActions";
import LikeButton from "./likeButton";
import { getClassMediaNames, checkHashtag } from "../util";

const Reply = ({ bant, location }) => {
  const banters = useSelector((state) => state.banters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOnBanter(bant._id));
  }, [bant._id, dispatch]);

  dayjs.extend(dayjsTwitter);

  return (
    <div>
      {banters && banters.loading_comments ? (
        <div>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : banters && banters.comments && banters.comments.length === 0 ? (
        <div></div>
      ) : (
        <div className="replies">
          {banters &&
            banters.comments &&
            banters.comments.map((banter, index) => (
              <div key={index}>
                <div className="flex-start-banter">
                  <div className="avatar-banter">
                    <img src={banter.userImage} alt="profile" />
                  </div>
                  <div className="flex-between-replies">
                    <div className="nameHandle-container-banter">
                      <div style={{ display: "flex" }}>
                        <div className="text-handle">
                          <span id="name">
                            {banter.name}{" "}
                            <span id="handle">@{banter.banterHandle} </span>
                          </span>
                        </div>
                        <div>
                          <span id="handle">
                            - {dayjs(banter.createdAt).twitter()}
                          </span>
                          <div className="dots">...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reply-to">
                  <span id="reply">
                    Replying to{" "}
                    <span id="reply-handle">@{bant.banterHandle}</span>
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
                            <div className="media-container">
                              <Link
                                to={{
                                  pathname: `/${banter.banterHandle}/status/${
                                    bant._id
                                  }/photo/${
                                    banter.banterImage.indexOf(image) + 1
                                  }`,
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
                  <div>
                    <div className="actions-container">
                      <div className="action-flex">
                        <div className="actions-flex-actions">
                          <div>
                            <MessageOutlined />{" "}
                          </div>
                          <div>
                            <span className="count">{banter.commentCount}</span>
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
                            <span className="count">{banter.rebantCount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="action-flex">
                        <div className="actions-flex-actions">
                          <div>
                            <LikeButton
                              likeCount={banter.likeCount}
                              banterId={banter._id}
                            />{" "}
                            {""}
                          </div>
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
            ))}
        </div>
      )}
    </div>
  );
};

export default Reply;
