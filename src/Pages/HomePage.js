import React from "react";
import { useSelector } from "react-redux";
import { LeftSideBar, RightSideBar, Main } from "../Components";
import "./styles/main/main.scss";

const HomePage = () => {
  const banters = useSelector((state) => state.banters);
  return (
    <div>
      {banters &&
        (banters.loading_banters ||
          banters.loading_banter ||
          banters.loading) && <div className="animated yt-loader"></div>}
      <div className="home-container">
        <div className="leftsidebar">
          <LeftSideBar />
        </div>
        <div className="mainbar">
          <Main />
        </div>
        <div className="rightsidebar">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
