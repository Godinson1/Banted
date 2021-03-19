import React from "react";
import "../Pages/styles/main/main.scss";

const Modal = ({ location }) => {
  const { state = {} } = location;
  const { modal } = state;
  return (
    <div>
      <div id={modal ? "show-modal" : undefined}>
        <div>
          <p>CONTENTjkhkgjgjgjgbjg</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
