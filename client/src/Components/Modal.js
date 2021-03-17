import React, { useState } from "react";
import { ReactComponent as Close } from "../icons/close.svg";

const Modal = (props) => {
  const { currImageSrc, currImageAlt, setModalActive } = props;

  const deactivateModal = () => {
    setModalActive(false);
  };
  return (
    <div className="modal-background">
      <div className="image-modal">
        <img src={currImageSrc} alt={currImageAlt} />
      </div>
      <button className="image-modal_close exit-btn" onClick={deactivateModal}>
        <Close />
      </button>
    </div>
  );
};

export default Modal;
