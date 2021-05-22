import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Timeline from "../../Main/Components/Timeline";

const Images = () => {
  const user = useSelector((state) => state.users);
  const [banterWithImages, setBanterWithImages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (user && user.profile && user.profile.banters) {
      const banters = user.profile.banters.filter(
        (banter) => banter.banterImage.length > 0
      );
      setBanterWithImages(banters);
    }
  }, [user]);

  return (
    <div>
      <div className="history-container">
        {banterWithImages.map((bant, i) => (
          <Timeline bant={bant} location={location} />
        ))}
      </div>
    </div>
  );
};

export default Images;
