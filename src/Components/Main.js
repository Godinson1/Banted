import React from "react";
import {
  StarOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  UploadOutlined,
  HeartFilled,
  PictureOutlined,
  SmileFilled,
  SmileOutlined,
  GifOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { getClassMediaNames, imageStrings } from "../util";
import NewBanter from "./NewBanter";
import "../Pages/styles/dashboard/dash.scss";

const Main = () => {
  return (
    <div>
      <div className="s">
        <div className="banter-header">
          <div>Home</div>
          <div>
            <StarOutlined className="secondary-color" />
          </div>
        </div>
        <div className="banter-container">
          <div className="create-banter-container">
            <div className="flex-start-banter">
              <div className="avatar-banter"></div>
              <div className="flex-between">
                <div className="nameHandle-container-banter">
                  <div className="banter-input-container">
                    <textarea placeholder="What's happening?" />
                  </div>
                </div>
              </div>
            </div>
            <div className="create-banter-base">
              <div className="flex-between">
                <div className="flex">
                  <div className="icon-action tooltip">
                    <PictureOutlined />
                    <span id="desc" class="tooltiptext">
                      image
                    </span>
                  </div>
                  <div className="icon-action tooltip">
                    <GifOutlined />
                    <span id="desc" class="tooltiptext">
                      gif
                    </span>
                  </div>
                  <div className="icon-action tooltip">
                    <PicCenterOutlined />
                    <span id="desc" class="tooltiptext">
                      poll
                    </span>
                  </div>
                  <div className="icon-action tooltip">
                    <SmileOutlined />
                    <span id="desc" class="tooltiptext">
                      emoji
                    </span>
                  </div>
                </div>
                <div>
                  <button disabled>Banter</button>
                </div>
              </div>
            </div>
          </div>
          <div className="banter-spacer"></div>
          <NewBanter />
          <NewBanter />
        </div>
      </div>
    </div>
  );
};

export default Main;
