import React from "react";
import "../Pages/styles/main/main.scss";

const Preloader = () => {
  return (
    <div>
      <div className="preloader">
        <div className="preloader-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
