import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, Route, useHistory } from "react-router-dom";
import {
  MessageOutlined,
  RetweetOutlined,
  UploadOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import { usePrepareLink } from "../hooks";
import LikeButton from "./likeButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getClassMediaNames } from "../util";
import "../Pages/styles/main/main.scss";

const NewBanter = () => {
  const banters = useSelector((state) => state.banters);
  dayjs.extend(relativeTime);

  const location = useLocation();
  const history = useHistory();

  const likesLink = usePrepareLink({
    to: "/likes",
    isRelativePath: true,
  });

  return (
    <div>
      {banters && banters.loading_banters ? (
        <div>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : banters && banters.banters && banters.banters.length === 0 ? (
        <div className="no-banter">
          Create or follow other users to see banters.
          <div className="menued">
            <div className="banter-button-container">
              <button id="banter-button">See Suggestions</button>
            </div>
          </div>
        </div>
      ) : banters && banters.banters ? (
        banters.banters.map((bant) => (
          <Link
            to={{
              pathname: `/${bant.banterHandle}/status/${bant._id}`,
              state: { banter: bant },
            }}
            className="link"
          >
            <div key={bant._id} className="account-bottom-banter">
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
                  {!bant.userImage ? (
                    <img src="/images/noimg.png" alt="no-profile" />
                  ) : (
                    <img
                      src={"/BantedImages/profileImages/" + bant.userImage}
                      alt="profile"
                    />
                  )}
                </div>
                <div className="flex-between">
                  <div className="nameHandle-container-banter">
                    <div>
                      <span id="name">
                        {bant.name}{" "}
                        <span id="handle">
                          @{bant.banterHandle} -{" "}
                          {dayjs(bant.createdAt).fromNow()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="dots">...</div>
                </div>
              </div>
              <div className="banter-text">
                <p className="bantext">{bant.banter}</p>
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
                  <div className="action-flex">
                    <div className="icon-action tooltip">
                      <MessageOutlined />
                      <span className="tooltiptext">comment</span>
                    </div>
                    <div>
                      <span className="count">{bant.commentCount}</span>
                    </div>
                  </div>
                  <div className="action-flex">
                    <div className="icon-action-rebant tooltip">
                      <RetweetOutlined />
                      <span className="tooltiptext">rebanter</span>
                    </div>
                    <div>
                      <span className="count">123</span>
                    </div>
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
                      <span class="tooltiptext">share</span>
                    </div>
                    <div>
                      <span className="count"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        ""
      )}
      <Route
        path={likesLink.pathname}
        children={({ match }) => {
          return (
            <Modal onClose={history.goBack} open={Boolean(match)}>
              <div>Hello</div>
            </Modal>
          );
        }}
      />
    </div>
  );
};

export default NewBanter;
