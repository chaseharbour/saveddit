import React, { useState, useEffect } from "react";
import Iframe from "./Iframe";

const IframeModal = ({ embedHTML, currAlt, currKey, setModalActive }) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const deactivateModal = () => {
    setModalActive(false);
  };

  const getSrcFromHTML = () => {
    const parsedHTML = embedHTML
      .split(" ")
      .filter((e) => e.includes("src"))
      .toString()
      .slice(4)
      .slice(1, -1);
    setIframeSrc(parsedHTML);
  };

  useEffect(() => {
    getSrcFromHTML();
  }, []);

  return (
    <>
      <div className="modal-background" onClick={deactivateModal}>
        <div className="image-modal">
          <Iframe src={iframeSrc} />
        </div>
      </div>
    </>
  );
};

export default IframeModal;
