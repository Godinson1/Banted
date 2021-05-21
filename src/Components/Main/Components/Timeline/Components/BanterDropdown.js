import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { deleteBanter } from "../../../../../actions/banterActions";

const BanterDropdown = ({ show, bant, setShow }) => {
  const user = useSelector((state) => state.users.credentials);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  return (
    <div>
      {show && (
        <div
          ref={wrapperRef}
          className="timeline-dropdown-banter"
          key={bant._id}
        >
          {user && user.credentials ? (
            <div>
              {user.credentials[0].handle === bant.banterHandle && (
                <div
                  className="option-container"
                  onClick={() => dispatch(deleteBanter(bant._id, setShow))}
                  id="name"
                >
                  <div id="delete">
                    <DeleteOutlined />
                  </div>
                  <div id="delete"> Delete Banter</div>
                </div>
              )}
              {user.credentials[0].handle === bant.banterHandle && (
                <div className="option-container" id="name">
                  <div>
                    <UserAddOutlined />
                  </div>
                  <div>Unfollow {`@${bant.banterHandle}`}</div>
                </div>
              )}
              <div className="option-container" id="name">
                <div>
                  <UnorderedListOutlined />
                </div>
                <div>
                  Add/Remove {""}
                  {`@${bant.banterHandle}`} from Lists
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default BanterDropdown;
