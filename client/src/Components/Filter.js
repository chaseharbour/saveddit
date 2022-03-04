import React, { useState, useEffect } from "react";

const Filter = ({ userSavedPosts, filterFunc }) => {
  const [allSubreddits, setAllSubreddits] = useState([]);
  const [checkedSubs, setCheckedSubs] = useState([]);
  const [uncheckedSubs, setUncheckedSubs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [unselected, setUnselected] = useState([]);

  useEffect(() => {
    const subs = userSavedPosts.map((post) => post.subreddit);

    const filteredSubs = subs
      .filter((item, i) => subs.indexOf(item) === i)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    setAllSubreddits(filteredSubs);
  }, [userSavedPosts]);

  //Updates state in the Dashboard component
  useEffect(() => {
    filterFunc(handleFilterSubs(userSavedPosts, selected));
  }, [selected, userSavedPosts]);

  const handleFilterSubs = (array, target) =>
    array.filter((item, i) => target.includes(item.subreddit));

  const handleCheckboxOnChange = (item) => {
    if (selected.includes(item)) {
      const selectedCopy = [...selected];
      //   const unselectedCopy = [...unselected];
      selectedCopy.splice(selected.indexOf(item), 1);
      //   unselectedCopy.push(item);
      //   setUnselected(unselectedCopy);
      return setSelected(selectedCopy);
    }

    const selectedCopy = [...selected];
    // const unselectedCopy = [...allSubreddits];
    selectedCopy.push(item);
    // unselectedCopy.splice(unselected.indexOf(item, 1));
    // setUnselected(unselectedCopy);
    return setSelected(selectedCopy);
  };

  return (
    <form className="form-container">
      <fieldset className="subreddit-fieldset">
        <legend className="subreddit-fieldset_legend">
          Filter by subreddit:
        </legend>
        {selected.length >= 1 ? (
          <>
            <ul className="subreddit-fieldset_list-selected">
              {selected.map((sub) => (
                <li className="subreddit-fieldset_selected anim-bg">
                  <input
                    className="subreddit-fieldset_checkbox"
                    type="checkbox"
                    id={sub}
                    onChange={() => handleCheckboxOnChange(sub)}
                    checked={selected.includes(sub) ? true : false}
                  ></input>
                  <label
                    className="subreddit-fieldset_checkbox-label"
                    htmlFor={sub}
                  >
                    {sub}
                  </label>
                </li>
              ))}
            </ul>
            <ul className="subreddit-fieldset_list">
              {allSubreddits.map((sub) => (
                <li className="subreddit-fieldset_all">
                  <input
                    className="subreddit-fieldset_checkbox"
                    type="checkbox"
                    id={sub}
                    onChange={() => handleCheckboxOnChange(sub)}
                    checked={selected.includes(sub) ? true : false}
                  ></input>
                  <label
                    className="subreddit-fieldset_checkbox-label"
                    htmlFor={sub}
                  >
                    {sub}
                  </label>
                </li>
              ))}
            </ul>{" "}
          </>
        ) : (
          <ul className="subreddit-fieldset_list">
            {allSubreddits.map((sub) => (
              <li className="subreddit-fieldset_all">
                <input
                  className="subreddit-fieldset_checkbox"
                  type="checkbox"
                  id={sub}
                  onChange={() => handleCheckboxOnChange(sub)}
                ></input>
                <label
                  className="subreddit-fieldset_checkbox-label"
                  htmlFor={sub}
                >
                  {sub}
                </label>
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
