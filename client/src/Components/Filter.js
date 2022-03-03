import React, { useState, useEffect } from "react";

const Filter = ({ userSavedPosts }) => {
  const [allSubreddits, setAllSubreddits] = useState([]);
  const [checkedSubs, setCheckedSubs] = useState([]);

  useEffect(() => {
    const subs = userSavedPosts.map((post) => post.subreddit);
    const filteredSubs = subs.filter((item, i) => subs.indexOf(item) === i);

    setAllSubreddits(filteredSubs);
  }, [userSavedPosts]);

  // const handleFilterPosts = (array, target) => {
  //   array.
  // }

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setCheckedSubs([...checkedSubs, e.target.name]);
    } else {
      setCheckedSubs(() =>
        checkedSubs.filter((item, i, arr) => item !== e.target.name)
      );
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Subreddit:</legend>
        <ul>
          {allSubreddits.map((sub) => (
            <li>
              <input
                type="checkbox"
                name={sub}
                onChange={handleCheckbox}
              ></input>
              <label for={sub}>{sub}</label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
};

export default Filter;
