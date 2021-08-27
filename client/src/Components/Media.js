import React from "react";
import ImageModal from "./ImageModal";
import Loading from "./Loading";
import Image from "./Image";
import VideoModal from "./VideoModal";
import IframeModal from "./IframeModal";

const Media = ({
  userName,
  userSavedPosts,
  dataLoading,
  getSavedQuery,
  userSelectedImg,
  modalActive,
  setModalActive,
  imgClickEvent,
}) => {
  let modal;
  console.log(userSelectedImg);

  if (userSelectedImg && modalActive && userSelectedImg.postHint === "image") {
    modal = (
      <ImageModal
        currImageSrc={userSelectedImg.src}
        currImageAlt={userSelectedImg.alt}
        currImageKey={userSelectedImg.title}
        setModalActive={setModalActive}
      />
    );
  } else if (
    userSelectedImg &&
    modalActive &&
    userSelectedImg.postHint === "rich:video"
  ) {
    modal = (
      <IframeModal
        embedHTML={userSelectedImg.mediaEmbed}
        setModalActive={setModalActive}
      />
    );
  } else if (
    userSelectedImg &&
    modalActive &&
    userSelectedImg.postHint === "link" &&
    userSelectedImg.mediaDomain === "i.imgur.com"
  ) {
    modal = (
      <VideoModal
        unchangedSrc={userSelectedImg.src}
        setModalActive={setModalActive}
      />
    );
  } else {
    modal = null;
  }

  return (
    <main className="dashboard-container">
      <aside className="dashboard-header">
        <h1 className="dashboard-header_text">
          Showing saved content for{" "}
          <span className="contrast-text">u/{userName}</span>
        </h1>
      </aside>

      <section className="image-container">
        {userSavedPosts ? (
          userSavedPosts.map((i) => {
            return (
              <Image
                imgClickEvent={imgClickEvent}
                postFullname={i.postFullName}
                imgSrc={i.imgMed}
                imgAlt={i.title}
              />
            );
          })
        ) : (
          <p>No saved images found.</p>
        )}
      </section>
      {userSavedPosts && !dataLoading ? (
        <button className="btn" onClick={getSavedQuery}>
          <p>Load More</p>
        </button>
      ) : (
        <Loading />
      )}
      {modal}
    </main>
  );
};

export default Media;
