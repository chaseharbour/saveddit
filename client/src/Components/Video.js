import React from "react";

const Video = ({ videoSrc }) => {
  return (
    <video
      cross-origin="anonymous"
      muted
      autoplay="true"
      controls
      width="100%"
      height="100%"
    >
      <source src={videoSrc} type="video/mp4"></source>
    </video>
  );
};

export default Video;
