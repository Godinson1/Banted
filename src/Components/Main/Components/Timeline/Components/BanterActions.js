import React, { useState, useRef } from "react";
import {
  HeartOutlined,
  RetweetOutlined,
  UploadOutlined,
  MessageOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useCloseOnClickOutside } from "../../../../../util";
import { useLocation, Link } from "react-router-dom";

const BanterActions = ({ bant, setShow, setAllowLink }) => {
  const [showRetweet, setShowRetweet] = useState(false);
  const location = useLocation();

  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShowRetweet, setAllowLink, setShow);

  return (
    <div className="base-actions-container">
      <div className="icon-action">
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
          <div className="action-tooltip">
            <MessageOutlined />{" "}
            <span className="count"> &nbsp; {bant.commentCount}</span>
            <span className="tooltiptext">comment</span>
          </div>
        </Link>
      </div>
      <div
        onClick={() => setShowRetweet(!showRetweet)}
        onMouseOver={() => setAllowLink(false)}
        className="icon-action"
      >
        <div className="action-tooltip">
          <RetweetOutlined />
          <span className="count"> &nbsp; {bant.rebantCount}</span>
          <span className="tooltiptext">rebant</span>
          {showRetweet && (
            <div
              ref={wrapperRef}
              className="timeline-dropdown-rebant"
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
      </div>
      <div className="icon-action">
        <div className="action-tooltip">
          <HeartOutlined />
          <span className="count"> &nbsp; {bant.likeCount}</span>
          <span className="tooltiptext">like</span>
        </div>
      </div>
      <div className="icon-action">
        <div className="action-tooltip">
          <UploadOutlined />
          <span className="tooltiptext">share</span>
        </div>
      </div>
    </div>
  );
};

export default BanterActions;
