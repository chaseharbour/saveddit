import React, { useState, useEffect } from "react";

const Filter = ({ userSavedPosts, filterFunc }) => {
  const [allSubreddits, setAllSubreddits] = useState([]);
  const [checkedSubs, setCheckedSubs] = useState([]);
  const [uncheckedSubs, setUncheckedSubs] = useState([]);

  useEffect(() => {
    const subs = userSavedPosts.map((post) => post.subreddit);

    const filteredSubs = subs.filter((item, i) => subs.indexOf(item) === i);
    //   .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    setAllSubreddits(filteredSubs);
  }, [userSavedPosts]);

  //Updates state in the Dashboard component
  useEffect(() => {
    filterFunc(handleFilterSubs(userSavedPosts, checkedSubs));
  }, [checkedSubs, userSavedPosts]);

  const handleFilterSubs = (array, target) =>
    array.filter((item, i) => target.includes(item.subreddit));

  const handleCheckboxOnChange = (e) => {
    setCheckedSubs({ ...checkedSubs, [e.target.id]: e.target.checked });
  };

  const handleCheckboxClicked = (e) => {
    if (e.target.checked) {
      setCheckedSubs([...checkedSubs, e.target.id]);
      setUncheckedSubs(allSubreddits.filter((item) => item !== e.target.id));
    } else {
      setCheckedSubs(() =>
        checkedSubs.filter((item, i, arr) => item !== e.target.id)
      );
      setUncheckedSubs(() =>
        allSubreddits.filter((item) => !checkedSubs.includes(item))
      );
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Subreddit:</legend>
        {checkedSubs.length >= 1 && uncheckedSubs.length >= 1 ? (
          <>
            <ul>
              {checkedSubs.map((sub) => (
                <li>
                  <input
                    type="checkbox"
                    id={sub}
                    onChange={handleCheckboxClicked}
                    checked={checkedSubs.includes(sub) ? true : false}
                  ></input>
                  <label htmlFor={sub}>{sub}</label>
                </li>
              ))}
            </ul>
            <ul>
              {uncheckedSubs.map((sub) => (
                <li>
                  <input
                    type="checkbox"
                    id={sub}
                    onChange={handleCheckboxClicked}
                    checked={checkedSubs.includes(sub) ? true : false}
                  ></input>
                  <label htmlFor={sub}>{sub}</label>
                </li>
              ))}
            </ul>{" "}
          </>
        ) : (
          <ul>
            {allSubreddits.map((sub) => (
              <li>
                <input
                  type="checkbox"
                  id={sub}
                  onChange={handleCheckboxClicked}
                ></input>
                <label htmlFor={sub}>{sub}</label>
              </li>
            ))}
          </ul>
        )}
        {/* <ul>
          {allSubreddits.map((sub) => (
            <li>
              <input
                type="checkbox"
                id={sub}
                value={sub}
                onChange={handleCheckboxClicked}
              ></input>
              <label for={sub}>{sub}</label>
            </li>
          ))}
        </ul> */}
      </fieldset>
    </form>
  );
};

export default Filter;
