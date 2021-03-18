import React, { useEffect } from "react";
import "../../Pages/css/utils/feedback/index.scss";

const Modal = ({ show }) => {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  /* When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  }*/

  useEffect(() => {
    if (show) {
      modal.style.display = "block";
    }
  }, [show]);

  const closeModal = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  return (
    <div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={closeModal} className="close">
            &times;
          </span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
