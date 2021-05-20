import React from "react";
import {
  SearchOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useViewport } from "../../../util";
import "./styles.scss";

const RightSidebar = () => {
  const { width } = useViewport();
  return (
    <div>
      {width < 768 ? (
        ""
      ) : (
        <div className="t">
          <div>
            <div className="right-bar-search-container">
              <div className="search-flex-between">
                <div className="search-flex">
                  <div>
                    <SearchOutlined className="search-icon" />
                  </div>
                  <div className="search-input-container">
                    <input type="text" placeholder="Search Banted" />
                  </div>
                </div>
                <div className="search-close-container">
                  <CloseOutlined className="search-close-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="right-bar-trend-container">
            <div className="trend-header">
              <div>Bantrends</div>
              <div className="tooltips">
                <SettingOutlined className="secondary-color" />
                <span className="tooltiptext">settings</span>
              </div>
            </div>
          </div>

          <div className="banted-footer">Banted - &copy; 2021.</div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
