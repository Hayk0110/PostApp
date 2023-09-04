import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAuthor,
  setSearch,
  setTitile,
} from "../store/reducers/FilterReducer";
import { changePage } from "../store/reducers/PaginationReducer";

import Feed from "../components/feed/Feed";

import Loading from "../UI/loading/Loading";

const FeedContainer = ({ posts, loading }) => {
  const { author, title, search } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(changePage(1));
    if (search === "by author") {
      dispatch(setAuthor(e.target[0].value));
    } else {
      dispatch(setTitile(e.target[0].value));
    }
  };

  const changeSearchType = (e) => {
    dispatch(setSearch(e.target.value));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Feed
      {...{
        posts,
        onSearch,
        author,
        title,
        search,
        changeSearchType,
      }}
    />
  );
};

export default FeedContainer;
