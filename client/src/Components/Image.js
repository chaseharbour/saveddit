import React from "react";

const Image = ({ imgClickEvent, postFullname, imgSrc, imgAlt }) => {
  return (
    <>
      <img
        className="image-container_item img-med"
        onClick={imgClickEvent}
        key={postFullname}
        src={imgSrc}
        alt={imgAlt}
      ></img>
    </>
  );
};

export default Image;
