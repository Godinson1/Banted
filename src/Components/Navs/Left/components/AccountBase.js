import React, { useState } from "react";
import Popup from "./Popup";

export default function AccountBase({ user }) {
  const [show, setShow] = useState(false);
  return (
    <div className='account-bottom' onClick={() => setShow(!show)}>
      {user && user.credentials ? (
        <div>
          <div className='flex-start-account'>
            <div className='avatar'>
              {user && user.credentials && user.credentials[0].userImage && (
                <img src={user.credentials[0].userImage} alt='user' />
              )}
            </div>
            <div className='nameHandle-container'>
              <div>
                <span id='name'>{user.credentials[0].name}</span>
              </div>
              <div className='handle-container'>
                <span id='handle'>@{user.credentials[0].handle}</span>
              </div>
            </div>
            <div className='dots'>...</div>
            {show && <Popup user={user} setShow={setShow} />}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
