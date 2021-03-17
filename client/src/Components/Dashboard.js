import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Modal from "./Modal";
import Loading from "./Loading";

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

    setUserSelectedImg({ src: clickedImgFullSizeSrc, alt: clickedImgAlt });
    setModalActive(true);
  };

  const getSavedQuery = () => {
    setDataLoading(true);
    fetch(`http://localhost:8081/dashboard/${nextPageQuery}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
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
    <main className="dashboard-container">
      <aside className="dashboard-header">
        <h2 className="dashboard-header_text">
          Showing saved content for u/{userName}
        </h2>
      </aside>

      <section className="image-container">
        {userSavedPosts ? (
          userSavedPosts.map((i) => {
            return (
              <img
                className="image-container_item img-med"
                onClick={imgClickEvent}
                key={i.postFullname}
                src={i.imgMed}
                alt={i.title}
              ></img>
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
      {userSelectedImg && modalActive ? (
        <Modal
          currImageSrc={userSelectedImg.src}
          currImageAlt={userSelectedImg.alt}
          setModalActive={setModalActive}
        />
      ) : null}
    </main>
  );
};

export default Dashboard;
