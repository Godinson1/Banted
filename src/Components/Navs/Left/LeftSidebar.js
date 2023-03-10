import React from "react";
import { useSelector } from "react-redux";

import { renderIcon } from "./renderIcon";
import "./styles.scss";
import Menu from "./components/Menu";
import AccountBase from "./components/AccountBase";
import ComposeBanter from "./components/ComposeBanter";

const LeftSidebar = () => {
  const user = useSelector((state) => state.users.credentials);

  return (
    <div className='left-sidebar-container'>
      <div className='banter-logo'>B</div>
      <Menu renderIcon={renderIcon} user={user} />
      <ComposeBanter />
      <AccountBase user={user} />
    </div>
  );
};

export default LeftSidebar;
