import React from "react";
import { ReactComponent as Close } from "../icons/close.svg";

const Modal = (props) => {
  const { currImageSrc, currImageAlt, setModalActive } = props;

  const deactivateModal = () => {
    setModalActive(false);
  };
  return (
    <div className="modal-background" onClick={deactivateModal}>
      <div className="image-modal">
        <img src={currImageSrc} alt={currImageAlt} />
      </div>
    </div>
  );
};

export default Modal;
