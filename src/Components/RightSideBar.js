import React from "react";
import {
  SearchOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../Pages/styles/main/main.scss";

const RightSideBar = () => {
  return (
    <div>
      <div className="t">
        <div>
          <div className="search-container">
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
        <div className="trend-container">
          <div className="trend-header">
            <div>Bantrends</div>
            <div style={{ marginTop: "5px" }} className="tooltip">
              <SettingOutlined className="secondary-color" />
              <span style={{ fontSize: 14 }} class="tooltiptext">
                settings
              </span>
            </div>
          </div>
        </div>

        <div className="banted-footer">Banted - &copy; 2021.</div>
      </div>
    </div>
  );
};

export default RightSideBar;
