import React from "react";
import { NavLink } from "react-router-dom";
import { SIDEBAR_LINKS } from "../constants";

export default function Menu({ user, renderIcon }) {
  return (
    <div>
      {SIDEBAR_LINKS.map((data, index) => {
        const { activeClassName, title, icon, path } = data;
        return (
          <div key={index}>
            <NavLink
              className='link'
              to={{
                pathname:
                  title === "Profile" ? user && user.credentials && user.credentials[0] && user.credentials[0].handle : path,
                state: { banter: user.credentials && user.credentials[0] },
              }}
              activeClassName={activeClassName}
            >
              <div className='flex-icon-name'>
                <div>{renderIcon(icon)}</div>
                <div>{title}</div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
