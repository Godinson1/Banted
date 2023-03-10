import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ComposeBanter() {
  const location = useLocation();
  return (
    <div>
      <Link
        to={{
          pathname: `/compose/banter`,
          state: {
            background: location,
            banter: null,
          },
        }}
        className='link'
      >
        <div className='banter-button-container'>
          <button id='banter-button'>Banter</button>
        </div>
      </Link>
    </div>
  );
}
