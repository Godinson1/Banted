import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  UploadOutlined,
  HeartFilled,
} from "@ant-design/icons";
import LikeButton from "./likeButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getClassMediaNames } from "../util";
import "../Pages/styles/main/main.scss";

const NewBanter = () => {
  const banters = useSelector((state) => state.banters);
  dayjs.extend(relativeTime);
  return (
    <div>
      {banters && banters.banters ? (
        banters.banters.map((bant) => (
          <Link
            to={`/${bant.banterHandle}/status/${bant._id}`}
            className="link"
          >
            <div className="account-bottom-banter">
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
                    <img src="/images/no-img.png" alt="profiles" />
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
                {bant.banterImage.length !== 0 ? (
                  <div className={getClassMediaNames(bant.banterImage)}>
                    {bant.banterImage.map((image, index) => {
                      return (
                        <Link
                          to={{
                            pathname: `/${bant.banterHandle}/status/${
                              bant._id
                            }/photo/${bant.banterImage.indexOf(image) + 1}`,
                            state: { modal: true },
                          }}
                          className="link"
                        >
                          <div className="media-container">
                            {<img src={image} alt="banter" />}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                <div className="actions-container">
                  <div className="action-flex">
                    <div className="icon-action tooltip">
                      <MessageOutlined />
                      <span class="tooltiptext">comment</span>
                    </div>
                    <div>
                      <span className="count">{bant.commentCount}</span>
                    </div>
                  </div>
                  <div className="action-flex">
                    <div className="icon-action-rebant tooltip">
                      <RetweetOutlined />
                      <span class="tooltiptext">rebanter</span>
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
        <div>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBanter;