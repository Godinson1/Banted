import React from "react";
import { Header } from "../Header";
import { RightSidebar, LeftSidebar, RightSidebarBanter } from "../Navs";
import { useViewport } from "../../util";
import "./layout.scss";

const Layout = ({ children, page, pageName }) => {
  const { width } = useViewport();
  return (
    <div>
      {width < 1280 ? (
        <div className="no-mobile">
          <h1>Hi there!</h1>
          Thanks for visiting the Banted App. Kindly view app with a wider
          screen size (preferrably desktop or laptop) as the mobile view is
          currently under revamp.
        </div>
      ) : (
        <div className="layout">
          <div className="left-side-bar">
            <div>
              <LeftSidebar />
            </div>
          </div>
          <div className="main-bar">
            <Header page={page} pageName={pageName} />
            {children}
          </div>
          <div className="right-side-bar">
            <div>
              {page === "view-banter" ? (
                <RightSidebarBanter />
              ) : (
                <RightSidebar />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
