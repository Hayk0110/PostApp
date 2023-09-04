import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../store/reducers/PostReducer";

import FeedContainer from "./FeedContainer";

const MainContainer = () => {
  const { posts, loading } = useSelector((state) => state.posts);
  const { currentPage } = useSelector((state) => state.paginate);
  const { category, date, sort, author, title } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPosts({
        currentPage,
        category,
        date,
        sort,
        author,
        title,
        published: true,
      })
    );
  }, [currentPage,category,date,sort,author,title]);

  return (
    <div className="container">
      <FeedContainer posts={posts} loading={loading} />
    </div>
  );
};

export default MainContainer;
