import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import FeedContainer from "./FeedContainer";
import { fetchPosts } from "../store/reducers/PostReducer";

const MainContainer = () => {
  const { posts, loading } = useSelector((state) => state.posts);
  const { currentPage } = useSelector((state) => state.paginate);
  const { category, date, sort, author } = useSelector((state) => state.filter);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchPosts({ currentPage, category, date, sort, author }));
  }, []);

  return (
    <div className="container">
      <FeedContainer posts={posts} loading={loading} />
    </div>
  );
};

export default MainContainer;
