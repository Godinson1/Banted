import React from "react";
import { useSelector } from "react-redux";

import {
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  UploadOutlined,
  HeartFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import LikeButton from "../Components/likeButton";
import "../Pages/styles/main/main.scss";
import NewBanter from "../Components/NewBanter";

const Bant = ({ historyObject }) => {
  const user = useSelector((state) => state.users.credentials);

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
            <div className="flex-start-account">
              <div className="avatar"></div>
              <div className="nameHandle-container">
                <div>
                  <span id="name">Goddy</span>
                </div>
                <div className="handle-container">
                  <span id="handle">@godinson</span>
                </div>
              </div>
            </div>
            <div className="font-white">Thank you Barca</div>
            <div className="primary-color">10:55 PM · Mar 18, 2021 - WEB</div>
            <div>
              <div className="actions-container">
                <div className="action-flex">
                  <div className="icon-action-rebant tooltip">353</div>
                  <div>
                    <span className="count">Comments</span>
                  </div>
                </div>
                <div className="action-flex">
                  <div className="icon-action-rebant tooltip">3535</div>
                  <div>
                    <span className="count">Rebanters</span>
                  </div>
                </div>
                <div className="action-flex">
                  454
                  <div>
                    <span className="count">Likes</span>
                  </div>
                </div>
              </div>
              <div className="actions-container-base">
                <div className="action-flex">
                  <div className="icon-action tooltip">
                    <MessageOutlined />
                    <span class="tooltiptext">comment</span>
                  </div>
                  <div>
                    <span className="count"></span>
                  </div>
                </div>
                <div className="action-flex">
                  <div className="icon-action-rebant tooltip">
                    <RetweetOutlined />
                    <span class="tooltiptext">rebanter</span>
                  </div>
                  <div>
                    <span className="count"></span>
                  </div>
                </div>
                <div className="action-flex">
                  <LikeButton banterId={"ehfedkkedkf"} />
                  <div>
                    <span className="count"></span>
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
    </div>
  );
};

export default Bant;
