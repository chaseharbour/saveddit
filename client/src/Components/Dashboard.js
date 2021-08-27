import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Media from "./Media";

const Dashboard = () => {
  const [userSelectedImg, setUserSelectedImg] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [userSavedPosts, setUSerSavedPosts] = useState([]);
  const [nextPageQuery, setNextPageQuery] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const { userName } = useContext(AuthContext);

  const imgClickEvent = (e) => {
    const clickedImgObj = userSavedPosts.find(
      (el) => el.title === e.target.alt
    );
    const clickedImgFullSizeSrc = clickedImgObj.imgFull;
    const clickedImgAlt = clickedImgObj.title;
    const clickedMediaPostHint = clickedImgObj.postHint;
    const mediaEmbed = clickedImgObj.mediaEmbed;
    const mediaDomain = clickedImgObj.domain;

    setUserSelectedImg({
      src: clickedImgFullSizeSrc,
      alt: clickedImgAlt,
      postHint: clickedMediaPostHint,
      mediaEmbed,
      mediaDomain,
    });
    setModalActive(true);
  };

  const getSavedQuery = () => {
    setDataLoading(true);
    fetch(`${process.env.REACT_APP_DASHBOARD}/${nextPageQuery}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Failed to retrieve subreddits");
      })
      .then((responseJson) => {
        //Subsequent queries are sent with a unique post identifier. Complimentary back-end logic can be found at ../../../server/routes/dashboard_routes.js line 55.
        if (nextPageQuery !== 1) {
          setUSerSavedPosts((prevItems) => [...prevItems, ...responseJson]);
        } else {
          setUSerSavedPosts(responseJson);
        }
        setDataLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSavedQuery();
  }, []);

  useEffect(() => {
    if (userSavedPosts.length > 1) {
      setNextPageQuery(
        userSavedPosts.slice(userSavedPosts.length - 1)[0].postFullname
      );
    }
  }, [userSavedPosts]);

  return (
    <>
      <Media
        userName={userName}
        userSavedPosts={userSavedPosts}
        dataLoading={dataLoading}
        getSavedQuery={getSavedQuery}
        userSelectedImg={userSelectedImg}
        modalActive={modalActive}
        setModalActive={setModalActive}
        imgClickEvent={imgClickEvent}
      />
    </>
  );
};

export default Dashboard;
