import React, { useState, useEffect } from "react";
import Video from "./Video";

const IframeModal = ({ unchangedSrc, currAlt, currKey, setModalActive }) => {
  const [videoSrc, setVideoSrc] = useState("");

  const deactivateModal = () => {
    setModalActive(false);
  };

  //Imgur videos are served in .gifv format but can be changed to .mp4 to serve in a <video> element.
  const handleChangeVideoFileType = () => {
    const parsedVideoSrc = unchangedSrc.slice(0, -4).concat("", "mp4");
    setVideoSrc(parsedVideoSrc);
  };

  useEffect(() => {
    handleChangeVideoFileType();
  }, []);

  return (
    <>
      <div className="modal-background" onClick={deactivateModal}>
        <div className="image-modal">
          <Video videoSrc={videoSrc} />
        </div>
      </div>
    </>
  );
};

export default IframeModal;
