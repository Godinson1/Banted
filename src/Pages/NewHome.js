import React from "react";
import { useSelector } from "react-redux";

import { LeftSideBar, RightSideBar, Main } from "../Components";
import "./styles/dashboard/dash.scss";

const NewHome = () => {
  const banters = useSelector((state) => state.banters);
  return (
    <div>
      <div className="new-containers">
        <div className="fside">
          <LeftSideBar />
        </div>
        <div className="main">
          <Main />
        </div>
        <div className="sside">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default NewHome;
