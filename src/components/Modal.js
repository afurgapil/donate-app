import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import "../style/Modal.scss";

function ModalComponent({ handleClose }) {
  return (
    <div id="modal">
      <div className="modal__items">
        <AiFillCloseSquare className="close-icon" onClick={handleClose}>
          Close
        </AiFillCloseSquare>
      </div>
      <h2 className="modal__items">Pending Transaction</h2>
      <p className="modal__items">
        You can continue with the page after your transaction is completed.
      </p>
    </div>
  );
}

export default ModalComponent;
