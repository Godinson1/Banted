import React from "react";
import { Markup } from "interweave";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";
import {
  HeartFilled,
  HeartOutlined,
  RetweetOutlined,
  UploadOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { BanterMedia } from "./Components";
import { checkHashtag } from "../../../../util";
import "./timeline.scss";

const Timeline = ({ bant, i, location }) => {
  dayjs.extend(dayjsTwitter);

  return (
    <div>
      <Link
        to={{
          pathname: `/${bant.banterHandle}/status/${bant._id}`,
          state: { banter: bant },
        }}
        className="link"
      >
        <div className="timeline-banter-container">
          <div className="banter-top-info">
            <HeartFilled /> Somebody and 4 others liked
          </div>
          <div className="banter-container">
            <div className="user-avatar">
              <Link
                to={{
                  pathname: `/${bant.banterHandle}`,
                  state: { banter: bant },
                }}
                className="link"
              >
                <img src={bant.userImage} alt="profile" />
              </Link>
            </div>
            <div className="timeline-content-container">
              <div className="header-between">
                <div className="name-handle-time">
                  <div className="name">{bant.name}</div>
                  <div className="handle">@{bant.banterHandle}</div>
                  <div className="date">
                    - {dayjs(bant.createdAt).twitter()}
                  </div>
                </div>
                <div className="dots tooltips">
                  ...
                  <span id="desc" className="tooltiptext">
                    more
                  </span>
                </div>
              </div>
              <div>
                <p className="bantext">
                  {<Markup content={checkHashtag(bant.banter)} />}
                </p>
                <BanterMedia imageBant={bant} imagelocation={location} />
              </div>
              <div className="base-actions-container">
                <div className="icon-action">
                  <MessageOutlined />{" "}
                  <span className="count"> &nbsp; {bant.commentCount}</span>
                </div>
                <div className="icon-action">
                  <RetweetOutlined />
                  <span className="count"> &nbsp; {bant.rebantCount}</span>
                </div>
                <div className="icon-action">
                  <HeartOutlined />
                  <span className="count"> &nbsp; {bant.likeCount}</span>
                </div>
                <div className="icon-action">
                  <UploadOutlined />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Timeline;
