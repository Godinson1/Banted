import React from "react";
import { LeftSideBar } from "../index";
import { Header } from "../Header";
import { RightSidebar } from "../Navs";
import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="layout">
        <div className="left-side-bar">
          <div>
            <LeftSideBar />
          </div>
        </div>
        <div className="main-bar">
          <Header />
          {children}
        </div>
        <div className="right-side-bar">
          <div>
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
