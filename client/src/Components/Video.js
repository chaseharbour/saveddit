import React from "react";

const Video = ({ videoSrc }) => {
  return (
    <video
      className="video"
      cross-origin="anonymous"
      muted
      autoplay="true"
      controls
    >
      <source src={videoSrc} type="video/mp4"></source>
    </video>
  );
};

export default Video;
