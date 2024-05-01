import React from "react";
import { Link } from "react-router-dom";
import "./ModalContainer.css";
import modalCloseIcon from "../../assets/modalCloseIcon.jpg";

const ModalContainer = (props) => {
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='modalContent'>{props.children}</div>
        <Link to="/">
          <img
            className='modalCloseIcon'
            src={modalCloseIcon}
            alt="modal-close-icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default ModalContainer;