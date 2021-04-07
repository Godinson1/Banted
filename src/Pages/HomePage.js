import React from "react";
import { useSelector } from "react-redux";
import {
  LeftSideBar,
  LeftSideBarMobile,
  RightSideBar,
  Main,
} from "../Components";
import { useViewport } from "../util";
import "./styles/main/main.scss";

const HomePage = () => {
  const banters = useSelector((state) => state.banters);
  const { width } = useViewport();

  return (
    <div>
      {banters &&
        (banters.loading_banters ||
          banters.loading_banter ||
          banters.loading) && <div className="animated yt-loader"></div>}
      <div className="home-container">
        <div>{width < 768 ? "" : <LeftSideBar />}</div>
        <div className={width < 640 ? "mainbar-mobile" : "mainbar"}>
          <Main />
        </div>
        {width > 640 && (
          <div className="rightsidebar">
            <RightSideBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
