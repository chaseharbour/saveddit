import React from "react";
import Image from "./Image";

const ImageModal = ({
  currImageSrc,
  currImageAlt,
  currImageKey,
  setModalActive,
}) => {
  const deactivateModal = () => {
    setModalActive(false);
  };
  return (
    <div className="modal-background" onClick={deactivateModal}>
      <div className="image-modal">
        <Image imgSrc={currImageSrc} imgAlt={currImageAlt} />
      </div>
    </div>
  );
};

export default ImageModal;
