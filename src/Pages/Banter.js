import React from "react";
import { LeftSideBar, RightSideBarBanter, Main } from "../Components";
import Bant from "./Bant";
import "./styles/main/main.scss";

const Banter = ({ history }) => {
  return (
    <div>
      <div className="home-container">
        <div className="leftsidebar">
          <LeftSideBar />
        </div>
        <div className="mainbar">
          <Bant historyObject={history} />
        </div>
        <div className="rightsidebar">
          <RightSideBarBanter />
        </div>
      </div>
    </div>
  );
};

export default Banter;
