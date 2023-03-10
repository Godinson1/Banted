import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Timeline from "../../Timeline";
import "./styles.scss";

const BanterCheck = () => {
  const banters = useSelector((state) => state.banters);
  const location = useLocation();

  return (
    <div>
      {banters && banters.loading_banters ? (
        <div>
          <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : banters && banters.banters && banters.banters.length === 0 ? (
        <div className='no-banter'>
          Create or follow other users to see banters.
          <div className='menued'>
            <div className='banter-button-container'>
              <button id='banter-button'>See Suggestions</button>
            </div>
          </div>
        </div>
      ) : banters && banters.banters ? (
        banters.banters.map((bant, i) => <Timeline bant={bant} key={i} location={location} i={i} />)
      ) : (
        ""
      )}
    </div>
  );
};

export default BanterCheck;
