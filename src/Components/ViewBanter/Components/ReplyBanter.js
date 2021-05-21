import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";
import { Markup } from "interweave";
import { BA, BM, BD } from "./index";
import { checkHashtag, useCloseOnClickOutside } from "../../../util";
import "../viewbanter.scss";

const ReplyBanter = ({ bant, banter, index, location }) => {
  const [show, setShow] = useState(false);
  const [showRetweet, setShowRetweet] = useState(false);
  const [allowLink, setAllowLink] = useState(true);

  console.log(showRetweet);

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
          <div key={index} className="timeline-banter-container">
            <div className="banter-container">
              <div className="user-avatar">
                <Link
                  to={{
                    pathname: `/${banter.banterHandle}`,
                    state: { banter: banter },
                  }}
                  className="link"
                >
                  <img src={banter.userImage} alt="profile" />
                </Link>
              </div>
              <div className="timeline-content-container">
                <div className="header-between">
                  <div className="name-handle-time">
                    <div className="name">{banter.name}</div>
                    <div className="handle">@{banter.banterHandle}</div>
                    <div className="date">
                      - {dayjs(banter.createdAt).twitter()}
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
                    <BD show={show} bant={banter} setShow={setShow} />
                  </div>
                </div>
                <div className="reply-container">
                  Replying to
                  <span id="reply-handle"> @{bant.banterHandle}</span>
                </div>
                <div>
                  <p className="bantext">
                    {<Markup content={checkHashtag(banter.banter)} />}
                  </p>
                  <BM imageBant={banter} imagelocation={location} />
                </div>
                <BA bant={banter} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ReplyBanter;
