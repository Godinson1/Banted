import React from "react";
import { Header } from "../Header";
import { RightSidebar, LeftSidebar, RightSidebarBanter } from "../Navs";
import "./layout.scss";

const Layout = ({ children, page }) => {
  return (
    <div>
      <div className="layout">
        <div className="left-side-bar">
          <div>
            <LeftSidebar />
          </div>
        </div>
        <div className="main-bar">
          <Header page={page} />
          {children}
        </div>
        <div className="right-side-bar">
          <div>
            {page === "view-banter" ? <RightSidebarBanter /> : <RightSidebar />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
