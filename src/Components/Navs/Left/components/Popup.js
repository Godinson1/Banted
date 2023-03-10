import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../../../actions/userActions";
import { useCloseOnClickOutside } from "../../../../util";

export default function Popup({ user, setShow }) {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  useCloseOnClickOutside(wrapperRef, setShow);

  return (
    <div ref={wrapperRef} className='dropdown-profile'>
      {user && user.credentials ? (
        <div className='flex-start-account prof'>
          <div className='avatar'>
            {user && user.credentials && user.credentials[0].userImage && <img src={user.credentials[0].userImage} alt='user' />}
          </div>
          <div className='nameHandle-container'>
            <div>
              <span id='name'>{user.credentials[0].name}</span>
            </div>
            <div className='handle-container'>
              <span id='handle'>@{user.credentials[0].handle}</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className='base-account' onClick={() => {}}>
        <span style={{ fontSize: "0.9rem" }} id='name'>
          Add an existing account
        </span>
      </div>
      <div className='base-account' onClick={() => dispatch(logoutUser())}>
        <span style={{ fontSize: "0.9rem" }} id='name'>
          Log Out @{user.credentials[0].handle}
        </span>
      </div>
    </div>
  );
}
