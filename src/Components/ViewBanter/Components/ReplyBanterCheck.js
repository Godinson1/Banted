import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCommentsOnBanter } from "../../../actions/banterActions";
import ReplyBanter from "./ReplyBanter";

const ReplyBanterCheck = ({ bant, location }) => {
  const banters = useSelector((state) => state.banters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOnBanter(bant._id));
  }, [bant._id, dispatch]);

  return (
    <div>
      {banters && banters.loading_comments ? (
        <div>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : banters && banters.comments && banters.comments.length === 0 ? (
        <div></div>
      ) : (
        <div>
          {banters &&
            banters.comments &&
            banters.comments.map((banter, index) => (
              <ReplyBanter
                bant={bant}
                banter={banter}
                index={index}
                location={location}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ReplyBanterCheck;
