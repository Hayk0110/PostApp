import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPosts } from "../../store/reducers/PostReducer";
import { setFilters } from "../../store/reducers/FilterReducer";
import { changePage } from "../../store/reducers/PaginationReducer";

import MyFeedContainer from "../../containers/MyFeedContainer";

const MyPosts = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.posts);
  const { category, date, sort, title } = useSelector((state) => state.filter);
  const { author } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email === author) {
      dispatch(
        fetchPosts({ currentPage: 1, category, date, sort, author, title })
      );
    } else {
      dispatch(
        fetchPosts({
          currentPage: 1,
          category,
          date,
          sort,
          author,
          title,
          published: true,
        })
      );
    }
    dispatch(setFilters({ author }));
    dispatch(changePage(1));
  }, [author, title]);

  return (
    <div className="container">
      <MyFeedContainer
        posts={posts}
        loading={loading}
        user={user}
        author={author}
      />
    </div>
  );
};

export default MyPosts;
