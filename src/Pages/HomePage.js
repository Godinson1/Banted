import React from "react";
import { LeftSideBar, RightSideBar, Main } from "../Components";
import "./styles/main/main.scss";

const HomePage = () => {
  return (
    <div>
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
