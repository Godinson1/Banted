import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Timeline from "../../Main/Components/Timeline";

const Banters = () => {
  const user = useSelector((state) => state.users);
  const location = useLocation();

  return (
    <div>
      <div className="history-container">
        {user &&
          user.profile &&
          user.profile.banters.map((bant, i) => (
            <Timeline bant={bant} location={location} />
          ))}
      </div>
    </div>
  );
};

export default Banters;
