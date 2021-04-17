import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LeftSideBar, RightSideBar, Main, Navbar } from "../Components";
import { useViewport } from "../util";
import "./styles/main/main.scss";

const HomePage = ({ location }) => {
  const [nav, setNav] = useState(false);
  const banters = useSelector((state) => state.banters);
  const { width } = useViewport();

  useEffect(() => {
    if (nav) {
      document.getElementById("myNav").style.width = "100%";
    } else {
      document.getElementById("myNav").style.width = "0%";
    }
  }, [nav]);

  return (
    <div>
      <div>
        <Navbar setNav={setNav} />
      </div>
      {banters &&
        (banters.loading_banters ||
          banters.loading_banter ||
          banters.loading) && <div className="animated yt-loader"></div>}
      <div className="home-container">
        <div>{width < 768 ? "" : <LeftSideBar />}</div>
        <div className={width < 640 ? "mainbar-mobile" : "mainbar"}>
          <Main nav={nav} setNav={setNav} location={location} />
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
