import React from "react";

const Iframe = ({ src }) => {
  console.log(src);
  return (
    <iframe
      width="100%"
      height="100%"
      frameborder="0"
      className="iframe"
      src={src}
      scrolling="no"
      allowFullScreen
    />
  );
};

export default Iframe;
