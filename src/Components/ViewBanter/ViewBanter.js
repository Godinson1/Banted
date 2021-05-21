import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HeartFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";
import { BanterMedia, BanterActions, ReplyBanterCheck } from "./Components";
import { checkHashtag } from "../../util";
import { Markup } from "interweave";
import Layout from "../Layout";
import "./viewbanter.scss";

const ViewBanter = () => {
  const location = useLocation();

  const bant = location.state.banter;
  dayjs.extend(dayjsTwitter);

  return (
    <div>
      <Layout page="view-banter">
        <div className="s">
          <div className="view-banter-container">
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
              </div>
            </div>
            <div className="base-top">
              <p className="bantext">
                {<Markup content={checkHashtag(bant.banter)} />}
              </p>
              <BanterMedia imageBant={bant} imagelocation={location} />
              <div className="base-info">
                {dayjs(bant.createdAt).format("h:mm A")} ·{" "}
                {dayjs(bant.createdAt).format("MMMM D, YYYY")} - Banted Web App
              </div>
              <div className="base-info">
                <div className="actions-container">
                  <div className="action-flex">
                    <div className="count">{bant.commentCount}</div>
                    <div>
                      <span>Comments</span>
                    </div>
                  </div>
                  <div className="action-flex">
                    <div className="count">{bant.rebantCount}</div>
                    <div>
                      <span>Rebanters</span>
                    </div>
                  </div>
                  <div className="action-flex">
                    <div className="count">{bant.likeCount}</div>
                    <div>
                      <span>Likes</span>
                    </div>
                  </div>
                </div>
              </div>
              <BanterActions location={location} bant={bant} />
            </div>
          </div>
          <ReplyBanterCheck bant={bant} location={location} />
        </div>
      </Layout>
    </div>
  );
};

export default ViewBanter;
