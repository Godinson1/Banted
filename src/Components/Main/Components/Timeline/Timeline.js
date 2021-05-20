import React, { useState, useRef } from "react";
import { Markup } from "interweave";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";
import { HeartFilled } from "@ant-design/icons";
import { BanterMedia, BanterActions } from "./Components";
import { checkHashtag, useCloseOnClickOutside } from "../../../../util";
import "./timeline.scss";
import BanterDropdown from "./Components/BanterDropdown";

const Timeline = ({ bant, i, location }) => {
  const [show, setShow] = useState(false);
  const [showRetweet, setShowRetweet] = useState(false);
  const [allowLink, setAllowLink] = useState(true);

  dayjs.extend(dayjsTwitter);
  const wrapperRef = useRef(null);
  console.log(showRetweet);
  useCloseOnClickOutside(wrapperRef, setShowRetweet, setAllowLink, setShow);
  dayjs.extend(dayjsTwitter);

  return (
    <div>
      <Link
        to={{
          pathname: allowLink ? `/${bant.banterHandle}/status/${bant._id}` : "",
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
                <div
                  onMouseOver={() => setAllowLink(false)}
                  onClick={() => setShow(!show)}
                  className="dots tooltips"
                >
                  ...
                  <span id="desc" className="tooltiptext">
                    more
                  </span>
                  <BanterDropdown show={show} bant={bant} setShow={setShow} />
                </div>
              </div>
              <div>
                <p className="bantext">
                  {<Markup content={checkHashtag(bant.banter)} />}
                </p>
                <BanterMedia imageBant={bant} imagelocation={location} />
              </div>
              <BanterActions bant={bant} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Timeline;
